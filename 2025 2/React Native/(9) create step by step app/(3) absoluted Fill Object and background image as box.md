(1) absoluted Fill Object
---------------------------
==> Instead Of Give Absolted element { top: 0, bottom: 0, right: 0, left: 0 } We Can Give it like following

    {
            ...StyleSheet.absoluteFillObject
    }


(2) Make Card With Background Image
-------------------------------------
==> 'style' : for style the box
==> 'imageStyle' : for style the image that in background

        <ImageBackground source = {{ uri: "https://plus.unsplash.com/premium_photo-1674675646818-01d7a7bae64c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVkaXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D" }}
            style = { styles.imageBackground }
            imageStyle = { styles.imgStyle }
        >

        const styles = StyleSheet.create({
            imageBackground: {
                width: s(166),
                height: vs(161),
                borderRadius: s(12),
                overflow: "hidden"
            },
            imgStyle: {
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                opacity: .8
            }
        })