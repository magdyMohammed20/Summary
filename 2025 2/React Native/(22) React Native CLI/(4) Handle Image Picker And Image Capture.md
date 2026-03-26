(1) Handle Image Picker (Usage Here With React Native Cli)
-------------------------
==> Run [npm i react-native-image-picker]
==> For ios Run This For New Architecture [RCT_NEW_ARCH_ENABLED=1 npx pod-install ios]
==> For Android [Set 'newArchEnabled' to 'true' inside android/gradle.properties]
==> For ios And Mac We Need To Add Keys By Run 'xed -b ios' For Open The Project Inside Xcode
    Then Enter To Our Project From Xcode And Enter To 'Info' Tab
    Then Add This Keys And It's Own Messages That Will Appears To User When Access Camera Or Gallery

    (NSPhotoLibraryUsageDescription) : "We Need to select photo gallery to select photos"
    (NSCameraUsageDescription) : "We need To Access Camera"
    (NSMicrophoneUsageDescription) : "We Need To Access Mic"

    Then From Xcode Toolbar Open 'product' And Select 'Clean Build Folder' 
    Then From Xcode Left Sidebar Click On 'Run Button'


(2) Create Select From Gallery Component
--------------------------------------------

    components/CameraGallery.tsx
    -------------------------------

    import { Button, View } from 'react-native'
    import React from 'react'
    import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker'

    const CameraGallery = () => {

        const handleOpenGallery = async () => {
            const options: ImageLibraryOptions = {
                mediaType: "photo",
                selectionLimit: 2
            }

            const result = await launchImageLibrary(options)

            if (result.assets) {
                console.log(result.assets) // Will Note Output Inside Xcode Not In VScode 
            }
        }
        return (
            <View>
                <Button title='open gallery' onPress={handleOpenGallery} />
            </View>
        )
    }

    export default CameraGallery

(3) Create Select Image Component
-----------------------------------

    CameraCapture.tsx
    --------------------

    import { Button, View } from 'react-native'
    import React from 'react'
    import { CameraOptions, launchCamera } from 'react-native-image-picker'

    const CameraCapture = () => {

        const handleTakePhoto = async () => {
            const options: CameraOptions = {
                mediaType: 'photo',
                quality: .8,
                saveToPhotos: true
            }

            const result = await launchCamera(options)

            if (result.didCancel) {
                console.log('User Cancel')
            } else if (result.errorCode) {
                console.log(result.errorMessage)
            } else {
                console.log(result.assets)
            }
        }
        return (
            <View>
                <Button title='Take A Photo' onPress={handleTakePhoto} />
            </View>
        )
    }

    export default CameraCapture
