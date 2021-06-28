import { GetServerSideProps } from "next";
import React from "react";
import ManagementCommon, { LAYOUT_TYPE } from "../../../components/ManagementCommon";
import SessionIdValidater from "../../../utils/SessionIdValidater";
import { Button, IconButton, List, ListItem, MenuItem } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Form } from "react-final-form";
import { Checkboxes, Select, TextField } from "mui-rff";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            sessionId: await SessionIdValidater(context),
        }
    }
};

interface IProps {
    sessionId: string,
}

const Edit = (props: IProps) => {
    return (
        <ManagementCommon
            pageTitle="教科編集"
            pageLayoutType={LAYOUT_TYPE.EDIT}
            sessionId={props.sessionId}
            onRightButtonClicked={() => { }}>
            <Form
                onSubmit={() => { }}
                initialValues={{ problemType : 0 }}
                render={({ handleSubmit, values }) => (
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: "10px",
                            height: "1200px",
                        }}>
                        <Typography variant="body1">問題にはテキストか画像を使用できます。</Typography>
                        <Select name="problemType" formControlProps={{ variant: "outlined" }}>
                            <MenuItem value="0" selected>テキスト</MenuItem>
                            <MenuItem value="1">画像</MenuItem>
                        </Select>
                        {
                            values.problemType == "0" ?
                                (<TextField name="problemBody" variant="outlined" label="問題文" multiline />) :
                                (
                                    <>
                                        <Button variant="contained" color="primary">画像追加</Button>
                                        <img src={"http://via.placeholder.com/500x300"}></img>
                                    </>
                                )
                        }
                        <Typography variant="body1">回答方法には選択式とテキスト入力が使えます。</Typography>
                        <Select name="choiceType" formControlProps={{ variant: "outlined" }} >
                            <MenuItem value="">
                                <em>未選択</em>
                            </MenuItem>
                            <MenuItem value="0">選択式</MenuItem>
                            <MenuItem value="1">テキスト</MenuItem>
                        </Select>
                        {values.choiceType == "0" ? (
                            <>
                            <Typography variant="body1">回答用の選択肢</Typography>
                            <div style={{ display: "flex" }}>
                                <Typography variant="body1" style={{ flexGrow: 1, textAlign: "center" }}>答え</Typography>
                                <Typography variant="body1" style={{ flexGrow: 16, textAlign: "center" }}>選択肢</Typography>
                                <Typography variant="body1" style={{ flexGrow: 1, textAlign: "center" }}>削除</Typography>
                            </div>
                            <List>
                            {(() => [
                                { id: 1, isCollect: false, choiceText: "選択肢1" },
                                { id: 2, isCollect: false, choiceText: "選択肢2" },
                                { id: 3, isCollect: false, choiceText: "選択肢3" },
                                { id: 4, isCollect: false, choiceText: "選択肢4" },
                            ].map((e) => (
                                <div style={{ display: "flex" }}>
                                    <Checkboxes name={`isCollect_${e.id}`} style={{ flexGrow: 15, margin: "auto 0" }} data={{ label: "", value: true }} />
                                    <TextField name={`choicesText_${e.id}`} style={{ flexGrow: 84 }} label={`選択肢${e.id}`} variant="outlined" />
                                    <IconButton style={{ flexGrow: 1 }}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </div>
                            )))()}
                        </List>
                        <Button variant="contained" color="primary" >選択肢追加</Button>
                        </>
                        ) : (
                            <TextField name="collectText" variant="outlined" label="正解のテキスト"></TextField>
                        )}
                        <Button variant="contained" color="secondary">問題追加</Button>
                        {(() => { console.log(values); })()}
                    </form>
                )}
            />
        </ManagementCommon>
    )
};

export default Edit;