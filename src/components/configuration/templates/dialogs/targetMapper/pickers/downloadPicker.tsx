import React, {useState} from "react";

import AVI from "../../../../../../assets/icons/filetypes/flat/avi.png"
import CSV from "../../../../../../assets/icons/filetypes/flat/csv.png"
import DOC from "../../../../../../assets/icons/filetypes/flat/doc.png"
import DBF from "../../../../../../assets/icons/filetypes/flat/dbf.png"
import FLA from "../../../../../../assets/icons/filetypes/flat/fla.png"
import JPG from "../../../../../../assets/icons/filetypes/flat/jpg.png"
import JSON from "../../../../../../assets/icons/filetypes/flat/json-file.png"
import MP4 from "../../../../../../assets/icons/filetypes/flat/mp4.png"
import PDF from "../../../../../../assets/icons/filetypes/flat/pdf.png"
import PNG from "../../../../../../assets/icons/filetypes/flat/png.png"
import PPT from "../../../../../../assets/icons/filetypes/flat/ppt.png"
import RTF from "../../../../../../assets/icons/filetypes/flat/rtf.png"
import SVG from "../../../../../../assets/icons/filetypes/flat/svg.png"
import TXT from "../../../../../../assets/icons/filetypes/flat/txt.png"
import XLS from "../../../../../../assets/icons/filetypes/flat/xls.png"
import XML from "../../../../../../assets/icons/filetypes/flat/xml.png"
import ZIP from "../../../../../../assets/icons/filetypes/flat/zip.png"
import {Col, Container, Row} from "react-bootstrap";
import {IconButton} from "@mui/material";

const filetypeIcons: {name: string, icon: any}[] = [
    {name: 'Avi', icon: AVI},
    {name: 'Csv', icon: CSV},
    {name: 'Doc', icon: DOC},
    {name: 'Dbf', icon: DBF},
    {name: 'Fla', icon: FLA},
    {name: 'Jpg', icon: JPG},
    {name: 'Json', icon: JSON},
    {name: 'Mp4', icon: MP4},
    {name: 'Pdf', icon: PDF},
    {name: 'Png', icon: PNG},
    {name: 'Ppt', icon: PPT},
    {name: 'Rtf', icon: RTF},
    {name: 'Svg', icon: SVG},
    {name: 'Txt', icon: TXT},
    {name: 'Xls', icon: XLS},
    {name: 'Xml', icon: XML},
    {name: 'Zip', icon: ZIP}
];


interface DownloadPickerProps {

}

export const DownloadPicker = (props: DownloadPickerProps) => {
    const [filetype, setFiletype] = useState<string | null>(null);

    return (
        <React.Fragment>
            <Container>
                <Row>
                    {
                        filetypeIcons.map((filetypeIcon) => {
                            return (
                                <Col xs={4} md={4} sm={4}>
                                    <IconButton aria-label={filetypeIcon.name} size="large" onClick={() => setFiletype(filetypeIcon.name)}>
                                        <img src={filetypeIcon.icon} style={{width: "48px", height: "48px",  filter: filetypeIcon.name !== filetype ? "grayscale(100%) contrast(110%) brightness(100%)" : undefined}}/>
                                    </IconButton>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>

        </React.Fragment>
    )
}
