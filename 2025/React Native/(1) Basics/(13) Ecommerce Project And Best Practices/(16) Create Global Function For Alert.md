(1) Create Global Function For Alert
---------------------------------------

    functions.ts
    ---------------

    import { Alert } from "react-native";

    export function showConfirmAlert(
        onConfirm: () => void,
    ) {
        Alert.alert(
            "Confirm Delete",
            "Are You Sure ?",
            [
                { text: "OK", style: "destructive", onPress: onConfirm },
            ],
            { cancelable: true }
        );
    }


    Component.tsx
    ------------------

    showConfirmAlert(() => handleDelete({ id: +item.id }))