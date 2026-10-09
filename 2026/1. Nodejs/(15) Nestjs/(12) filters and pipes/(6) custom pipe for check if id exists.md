(1) custom pipe for check if id exists
-----------------------------------------

    posts/pipes/post-exists.pipe.ts
    ----------------------------------

    import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
    import { PostsService } from "../posts.service";


    @Injectable()
    export class PostExistsPipe implements PipeTransform {
        constructor(private readonly postService: PostsService) {

        }

        transform(value: any, metadata: ArgumentMetadata) {
            try {
                this.postService.findOne(value);
            } catch (e) {
                throw new NotFoundException(`Post with id ${value} not found111`);
            }

            return value;
        }
    }

    posts/posts.controller.ts
    ------------------------------

    import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus, UsePipes } from '@nestjs/common';
    import { PostsService } from './posts.service';
    import { CreatePostDto } from './dto/create-post.dto';
    import { PostExistsPipe } from './pipes/post-exists.pipe';

    @Controller('posts')
    export class PostsController {
        constructor(private readonly postsService: PostsService) { }

        // usage with find one
        @Get(':id')
        findOne(@Param('id', PostExistsPipe) id: string): CreatePostDto {
            return this.postsService.findOne(+id);
        }

        // usage with update one
        @Patch(':id')
        update(@Param('id', PostExistsPipe) id: string, @Body() updatePostDto: UpdatePostDto) {
            return this.postsService.update(+id, updatePostDto);
        }

        // usage with delete one
        @Delete(':id')
        remove(@Param('id', PostExistsPipe) id: string) {
            return this.postsService.remove(+id);
        }

    
    }
