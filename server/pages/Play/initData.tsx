import router from "next/router";
import React, { useEffect } from "react";
import ReviewCommon from "../../components/ReviewCommon";
import { dexieDb } from "../../models/dexie";

const initDate = () => {
    useEffect(() => {
        dexieDb.delete();
        router.push(`/Play/SubjectList`);
    },[]);
    return (
        <ReviewCommon appbar={{ title: "答え合わせ" }} snackBar={{}}>
            <>
            </>
        </ReviewCommon>
    );
};
export default initDate;