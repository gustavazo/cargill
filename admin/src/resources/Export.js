import { Modal } from "@mui/material";
import { useEffect, useRef } from "react";
import jsPDF from 'jspdf'
import { v4 as uuid } from 'uuid';
import * as  htmlToImage from 'html-to-image';
import download from "downloadjs";
import { Button } from "react-admin";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';

export function ExportModal({ fileName = 'document', children, onError = (error) => { }, open = false, onClose = () => { } }) {
    const divIdRef = useRef(undefined);
    useEffect(() => {
        const id = uuid();
        divIdRef.current = id;
    }, [])
    const downLoadPNG = (dataUrl, fileName = "image") => {
        download(dataUrl, `${fileName}.png`)
    }
    const downloadPDF = (dataUrl, htmlNode, fileName = "document") => {
        const doc = new jsPDF("p", 'px');
        const imgWidth = doc.internal.pageSize.getWidth() * 0.9;
        const imgHeight = (imgWidth * htmlNode.clientHeight) / htmlNode.clientWidth;
        const x = (doc.internal.pageSize.getWidth() - imgWidth) / 2
        const y = 0
        if (doc.internal.pageSize.height < imgHeight) doc.internal.pageSize.height = imgHeight * 1.05;
        doc.addImage(dataUrl, "PNG", x, y, imgWidth, imgHeight);
        doc.save(`${fileName}.pdf`);
        return
    }
    const downloadReport = async (id, options = { png: false, pdf: false }) => {
        try {
            const input = document.getElementById(id);
            if (!input) throw new Error("Cannot get document by id")
            const dataUrl = await htmlToImage.toPng(input, { quality: 1 });
            if (options.png) downLoadPNG(dataUrl, fileName)
            if (options.pdf) downloadPDF(dataUrl, input, fileName)

        } catch (error) {
            console.error(error);
            onError(error);
        }
    };
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={style.modalContainer}>
                    <div style={{ width: "100%", display: 'flex', justifyContent: 'end' }}>
                        <div style={{ marginRight: 50 }}>
                            <span style={{ margin: 30, fontWeight: 'bold' }}>
                                Exportar:
                            </span>
                            <Button size="large" onClick={() => downloadReport(divIdRef.current, { pdf: true })}>
                                <PictureAsPdfIcon style={{ fontSize: 30 }} />
                            </Button>
                            <Button size="large" onClick={() => downloadReport(divIdRef.current, { png: true })}>
                                <ImageIcon style={{ fontSize: 30 }} />
                            </Button>
                        </div >
                    </div>
                    <div style={style.documentContainer}>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                            <div id={divIdRef.current} style={style.htmlToExport}
                            >
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

const style =
{
    documentContainer: {
        backgroundColor: 'gray',
        height: "80%",
        overflow: 'scroll',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start'
    },
    modalContainer: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        width: '10in',
        borderRadius: 20,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    htmlToExport: {
        padding: 10,
        width: '8.27in',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center'
    }
}

