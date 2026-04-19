(1) POST Order IN DB
------------------------


    import { addDoc, collection} from "firebase/firestore";

    type CheckoutFormValues = {
        fullName: string;
        phone: string;
        address: string;
    };

    // 1- Get User Id Which Fetched After User Login And Presisted In Our App
    const { uid } = useSelector((state: RootState) => state.auth)

   // 2- Create The Create Order Request
    const createOrder = async (orderData: object) => {
        try {
            const docRef = await addDoc(collection(db, "orders"), {
                ...orderData,
            });

            return docRef.id;
        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    };

    // 2- Inside OnSubmit Call The createOrder
    const onSubmit = async (data: CheckoutFormValues) => {
        createOrder({
            total,
            uid,
            cart, 
            ...data
        })
    };