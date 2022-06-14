import { ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from "@material-ui/core";
import React, { useState } from "react";
import { dexieDb, IMarkList } from "../models/dexie";
import router from "next/router";
import Link from "next/link";

const CheckList = (props: { checkedList: IMarkList }) => {
    const [checked, setChecked] = useState(true);
    const handle = async (problemHash: string[]) => {
        let nextProblemNumber = 0;

        let i = 0;
        //問題リストクリア
        await dexieDb.problem_hash_order.clear();

        //引数と渡されたhashListをコピーする
        const problemHashList = problemHash.slice();
        // データベースに番号と一緒にハッシュを追加していく。
        await dexieDb.problem_hash_order.bulkAdd(
            problemHashList.map(e => { return { id: i++, hash: e } })
        );
        await dexieDb.currentProblem.clear();
        await dexieDb.currentProblem.add({ id: 0 });
        await dexieDb.answerList.clear();

        let nextProblemHash = "";
        if ((await dexieDb.problem_hash_order.get(nextProblemNumber)) === undefined) {
            //１番の問題がない時は教科リストに飛ぶ
            router.push(`/Play/SubjectList`);
        } else {
            nextProblemHash = (await dexieDb.problem_hash_order.get(nextProblemNumber))!.hash;
            router.push(`/Play/Review?problemHash=${nextProblemHash}`);
        }
    };
    return (
        <Link href="#">
            <ListItem
                key={props.checkedList.hash}
                onClick={() => { handle([props.checkedList.hash]) }}
                style={{ color: "white" }}
            >
                {
                    props.checkedList.problem_type == 0 ?
                        <ListItemText primary={props.checkedList.problem_body} />
                        :
                        <img src={props.checkedList.problem_image_url || "http://via.placeholder.com/500x300"} width="90%" height="auto"></img>
                }
                <ListItemSecondaryAction>
                    <Checkbox
                        checked={checked}
                        onChange={async (event) => {
                            setChecked(event.target.checked);
                            if (event.target.checked)
                                await dexieDb.MarkList.add(props.checkedList);
                            else
                                await dexieDb.MarkList.delete(props.checkedList.hash);
                        }}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        </Link >
    )

}
export default CheckList;