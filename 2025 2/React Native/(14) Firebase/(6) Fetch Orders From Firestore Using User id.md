(1) Fetch Orders From Firestore Using User Id
------------------------------------------------

    import { FlatList, View } from 'react-native'
    import { useEffect, useState } from 'react'
    import MyOrdersCard from '../../components/profile/MyOrdersCard'
    import { useSelector } from 'react-redux'
    import { RootState } from '../../store/store'
    import { collection, getDocs, query, where } from 'firebase/firestore'
    import { db } from '../../config/firebaseConfig'
    import FullScreenLoader from '../../components/Loaders/FullScreenLoader'
    import { Order } from '../../types/orders'

    const MyOrdersScreen = () => {

        // 1- Create Array For Store User Orders
        const [orders, setOrders] = useState<Order[]>([]);

        // 2- Loading State
        const [isLoading, setIsLoading] = useState<boolean>(true);

        // 3- Get User Id From Toolkit
        const { uid } = useSelector((state: RootState) => state.auth)

        // 4- Firestore Logic To Fetch Orders Using uid
        const getUserOrders = async () => {

            try {
                const q = query(collection(db, 'orders'), where("uid", "==", uid));

                const querySnapshot = await getDocs(q)
                const orders = querySnapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
                return orders
            } catch (error) {
                console.log('errrrror', error)
            }
        }

        // 5- Create This For Call In useEffect
        const fetchOrders = async () => {
            const ordersData = await getUserOrders()
            setOrders(ordersData)
            setIsLoading(false)
        }

        // 6- Fetch Orders Here
        useEffect(() => {
            if (!uid) return;
            fetchOrders()
        }, [uid])


        return (
            <View style={styles.container}>
                <FullScreenLoader visible={isLoading} />
                {
                    orders && <FlatList
                        showsVerticalScrollIndicator={false}
                        data={orders}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <>

                            <MyOrdersCard id={item.id} totalPrice={item.total} totalPriceAfterDiscount={20} date={'20-1'} />
                        </>}
                    />
                }
            </View>
        )
    }

    export default MyOrdersScreen
