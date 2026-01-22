(1) Fetching Data
---------------------
==> Step1: Configure 'drizzle.ts'
==> Step2: Handle The Request Inside Any Page Using The 'db'



    src/db/drizzle.ts
    ------------------

    import { config } from 'dotenv'

    import { drizzle } from 'drizzle-orm/neon-http'

    config({
        path: '.env'
    })

    export const db = drizzle(process.env.DATABASE_URL!);
    

    app/blog/page.tsx
    -------------------
    
    import { db } from "@/db/drizzle"
    import { posts } from "@/db/schema"

    async function page() {
        const _posts = await db.select().from(posts)

        console.log(_posts)
        return (
            <div>page </div>
        )
    }

    export default page
    
(2) Optimization : For Handle The Data Fetching
--------------------------------------------------
==> Step1: Create 'src/db/data.ts' For Contains All Used Schemas
==> Step2: Install 'npm i server-only' Package For Consider All Functions In 'data.ts' To Be Used On The 'Server' Only
==> Step3: Handle The Api Call Inside Any Page

    src/db/data.ts
    ------------------
    
    import "server-only";

    import { db } from "./drizzle";
    import { comments, postLikes, posts, users } from "./schema";
    import { count, countDistinct, desc, eq } from "drizzle-orm";
    import { cache } from "react";

    const POSTS_PER_PAGE = 5; // posts per page

    export const fetchPosts = async (page = 1) => {
        try {
            const likesCount = db
                .select({
                    postId: postLikes.postId,
                    likeCount: count(postLikes.userId).as("likeCount"),
                })
                .from(postLikes)
                .groupBy(postLikes.postId)
                .as("likesCount");

            const commentsCount = db
                .select({
                    postId: comments.postId,
                    commentCount: count(comments.id).as("commentCount"),
                })
                .from(comments)
                .groupBy(comments.postId)
                .as("commentsCount");

            const result = await db
                .select({
                    id: posts.id,
                    title: posts.title,
                    content: posts.content,
                    createdAt: posts.createdAt,
                    authorName: users.name,
                    likeCount: likesCount.likeCount,
                    commentCount: commentsCount.commentCount,
                })
                .from(posts)
                .innerJoin(users, eq(posts.author, users.id))
                .leftJoin(likesCount, eq(posts.id, likesCount.postId))
                .leftJoin(commentsCount, eq(posts.id, commentsCount.postId))
                .orderBy(desc(posts.createdAt))
                .limit(POSTS_PER_PAGE)
                .offset((page - 1) * POSTS_PER_PAGE);

            return result;
        } catch (error) {
            console.error("fetchPosts Error:", error);
            throw new Error("Failed to fetch posts.");
        }
    };

    export async function getPostCount() {
        const result = await db
            .select({
                count: count(posts.id).as("count"),
            })
            .from(posts);

        return Number(result[0].count) || 0;
    }

    export async function getAllPostIds() {
        const result = await db.select({ id: posts.id }).from(posts);
        return result;
    }

    export const getPostById = cache(async (postId: string) => {
        try {
            const result = await db
                .select({
                    id: posts.id,
                    title: posts.title,
                    content: posts.content,
                    createdAt: posts.createdAt,
                    updatedAt: posts.updatedAt,
                    authorName: users.name,
                    likeCount: countDistinct(postLikes.userId).as("likeCount"),
                    commentCount: countDistinct(comments.id).as("commentCount"),
                })
                .from(posts)
                .innerJoin(users, eq(posts.author, users.id))
                .leftJoin(postLikes, eq(postLikes.postId, posts.id))
                .leftJoin(comments, eq(comments.postId, posts.id))
                .where(eq(posts.id, postId))
                .groupBy(posts.id, users.id);

            return result[0] ?? null;
        } catch (error) {
            console.error("getPostById Error:", error);
            throw new Error("Failed to fetch post.");
        }
    });

    export async function getCommentsByPostId(postId: string) {
        const result = await db
            .select({
                id: comments.id,
                content: comments.content,
                createdAt: comments.createdAt,
                authorName: users.name,
            })
            .from(comments)
            .leftJoin(users, eq(comments.userId, users.id))
            .where(eq(comments.postId, postId))
            .orderBy(comments.createdAt);

        return result;
    }
    

    app/blog/page.tsx
    -------------------
    
        
    import { fetchPosts, getPostCount } from "@/db/data"
    import Link from "next/link"

    async function page() {
        const _posts = await fetchPosts()

        const count = await getPostCount()

        return (
            <div className= "p-12" >

                <h1 className="text-xl" > Total Posts Count: & nbsp;
                    <span className="text-gray-400" >
                        { count }
                    </span>
                </h1>

            <div className = "mt-6">
                    {
                        _posts.map(post => <div className="my-6 border-b border-gray-800 pb-6" >

                            <h3 className="text-lg text-gray-400"> { post.title } </h3>
                            <span className = "mt-1 block"> Author : { post.authorName } </span>
                            <div className = "flex gap-3 mt-3">
                            <div className="bg-blue-400 px-2 rounded-sm"> Likes : <span>{ post.likeCount } </span></div>
                            <div className="bg-orange-600 px-2 rounded-sm"> Comments : <span>{ post.commentCount } </span></div>
                        
                            </div>
                            
                                <p className="text-sm mt-4 text-gray-300" >
                                { post.content }
                                </p>

                                <div className = "mt-5">
                                    <Link className="text-blue-400" href = {`/blog/${post.id}`}> Read More { '>>' } </Link>
                                </div>
                            </div>
                            )
                    }


            </div>


        </div>
    )
    }

    export default page
    

(3) Handle The fetchPosts And Count Using Promise.all()
--------------------------------------------------------
    
    const _posts = await fetchPosts() // ⛔ Removed

    const count = await getPostCount() // ⛔ Removed

    const [posts, count] = await Promise.all([fetchPosts(), getPostCount()])


(4) Fetch Blogs Details Using Id
------------------------------------

    app/blog/[id]/page.tsx
    -----------------------
    
    import { getCommentsByPostId, getPostById } from "@/db/data"

    interface Props {
        params: Promise<{ id: string }>
    }
    async function SingleBlog({ params }: Props) {
        const { id } = await params

        const [post] = await Promise.all([getPostById(id)])

        return (
            <div>
                <div className="p-12" >

                <h1 className="text-3xl" > { post.title } </h1>

                    <div className = "mt-6" >

                        <div>
                        <span className="mt-1 block" > Author : { post.authorName } </span>
                            <div className = "flex gap-3 mt-3" >
                                <div className="bg-blue-400 px-2 rounded-sm" > Likes : <span>{ post.likeCount } < /span></div >
                                    <div className="bg-orange-600 px-2 rounded-sm" > Comments : <span>{ post.commentCount } < /span></div >
                                    </div>
                                        
                                <p className = "text-sm mt-4 text-gray-300" >
                                    { post.content }
                                </p>
                            </div>
                        </div>
                    </div>
            </div>
    )
    }

    export default SingleBlog


(5) We Can Generate Or Set Static Params For Blog Details Page So When Build The App Will Note That The Specificed Ids Will Generates Pages Statically
--------------------------------------------------------------------------------------



    app/blog/[id]/page.tsx
    -----------------------

    export default SingleBlog

    // Add This Only
    export function generateStaticParams() {
        return [
            {
                id: 'dc6e4fcc-32e3-4f64-e3a0-ab96b83f672c'
            }
        ]
    }

(6) Caching The Data Of Page For Specific Seconds By Add This Line
---------------------------------------------------------------------

    export const revalidate = 10;


(7) For Define Page Meta Data Add This Export For The Reuired Page
--------------------------------------------------------------

    import type { Metadata } from "next";

    // This For Static Pages
    export const metadata: Metadata = {
        title: "Blogs Details Page",
        description: "Generated by Blogs",
    };


    // Or This For Dynamic Pages Like Blog Details Page
    export async function generateMetadata({ params }:{params: Promise<{id: string}>}): Promise<Metadata> {

        const {id} = await params
        return {
            title: `Blog Details For ${id}`,
            description: 'Desc Page'
        }
    }

(8) Add Loading Spinner For Page
-----------------------------------
==> By Create 'loading.tsx' File Beside The 'page.tsx'


    loading.tsx
    --------------

    function Loader() {
        return (
            <div>loading...</div>
        )
    }

    export default Loader