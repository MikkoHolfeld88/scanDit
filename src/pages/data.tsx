import React, {useEffect} from "react";
import {Upload} from "../components/data/upload";
import ListViewStyle from "../components/data/listViewStyle";
import {getDatabase, onValue, ref} from "firebase/database";
import {getAuth} from "firebase/auth";
import {CollectionsFiles, File} from "../firebase/types/collections.files";
import {Col, Container, Row} from "react-bootstrap";
import {COLLECTIONS_REALTIME_DATABASE} from "../firebase/enums/collections.realtimeDatabase";
import Table from "../components/data/table";
import {Accordion, AccordionTab} from "primereact/accordion";

export const Data = () => {
    const [data, setData] = React.useState<CollectionsFiles | null>(null);
    const [activeIndex, setActiveIndex] = React.useState<number | number[]>(0);

    useEffect(() => {
        const db = getDatabase();
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const uid = user.uid;
            const dbRef = ref(db, `/${uid}/${COLLECTIONS_REALTIME_DATABASE.FILES}`);

            const unsubscribe = onValue(dbRef, (snapshot) => {
                const data = snapshot.val();

                setData(data);
            });

            return () => {
                unsubscribe();
            };
        }
    }, []);

    return (
        <React.Fragment>
            <div id="data-page-header" className="d-flex">
                <Upload/>
                <ListViewStyle/>
            </div>

                        {
                            <Accordion
                                style={{marginTop: "10px"}}
                                multiple
                                activeIndex={activeIndex}
                                onTabChange={(e) => setActiveIndex(e.index)}>
                                {
                                    data && (Object.keys(data) as Array<keyof typeof data>).map((key) => {
                                        return (
                                            <AccordionTab key={key} header={key}>
                                                <Table rows={
                                                    data[key]?.map((file: File, index: number) => {
                                                        return (
                                                            {
                                                                filename: file.filename,
                                                                url: file.url,
                                                                uploaded: file.uploaded,
                                                                id: index + 1
                                                            }
                                                        );
                                                    })
                                                } />
                                            </AccordionTab>
                                        );
                                    })
                                }
                            </Accordion>
                        }

        </React.Fragment>
    );
}
