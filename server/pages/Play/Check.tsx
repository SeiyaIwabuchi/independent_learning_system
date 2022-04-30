import { Checkbox, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { List, Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import CheckList from "../../components/CheckList";
import OuterFrame from "../../components/OuterFrame";
import ReviewCommon from "../../components/ReviewCommon";
import ReviewResultList from "../../components/ReviewResultList";
import { dexieDb, IMarkList } from "../../models/dexie";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {}
    }
};

const Check = () => {
    const [checkedList, setCheckedList] = useState<IMarkList[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const interval = setInterval(()=>setIsLoading(true),500);
        (async ()=>{
            setCheckedList((await dexieDb.MarkList.toArray()));
            clearInterval(interval);
            setIsLoading(false);
        })();
    }, []);
    return (
        <>
            <ReviewCommon appbar={{ title: "チェックリスト" }} snackBar={{}} loading_circle={{state:isLoading}}>
                <>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "10px",
                            height: "110px",
                            justifyContent: "space-around"
                        }}
                    >
                        <Typography variant="h4" align="center">チェック問題一覧</Typography>
                        <Typography variant="subtitle1" align="center">チェックマークを付けた問題の一覧です。</Typography>
                        <Typography variant="subtitle1" align="center">チェックを外すとリストから削除されます。</Typography>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: "10px"
                        }}>
                        <List>
                            {
                                checkedList.map(e => <CheckList checkedList={e} />)
                            }
                        </List>
                    </div>
                </>
            </ReviewCommon>
        </>
    )
};
export default Check;