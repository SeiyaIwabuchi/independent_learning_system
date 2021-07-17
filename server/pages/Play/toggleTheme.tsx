import router from "next/router";
import React, { useEffect } from "react";
import ReviewCommon from "../../components/ReviewCommon";
import { dexieDb } from "../../models/dexie";

const toggleTheme = () => {
    useEffect(() => {
        dexieDb.Theme.toArray()
        .then(array => {
            if(array[0].themeType == "dark")
                dexieDb.Theme.update(array[0].themeType,{themeType:"light"});
            else
                dexieDb.Theme.update(array[0].themeType,{themeType:"dark"});
        })
        window.location.href = "/Play/SubjectList";
    },[]);
    return (
        <ReviewCommon appbar={{ title: "答え合わせ" }} snackBar={{}}>
            <>
            </>
        </ReviewCommon>
    );
};
export default toggleTheme;