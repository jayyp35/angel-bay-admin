import React, { useEffect, useState } from 'react';
import { Page, Text, Font, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import ablogo from '../../assets/ablogo.png';
import { SIZE } from '../../store/constants/style-constants';
const img =
    'https://firebasestorage.googleapis.com/v0/b/angel-bay.appspot.com/o/styleimgs%2F3344%2FWhatsApp%20Image%202023-07-27%20at%2014.28.02.jpeg?alt=media&token=4c598ac2-37ee-4f64-bea5-7a01506d6538';
const styles = StyleSheet.create({
    doc: {
        width: '100%',
    },
    page: {
        backgroundColor: 'white',
        fontSize: '12px',
        fontWeight: 500,
    },
    top: {
        padding: '5px 5px',
        borderBottom: '1px solid black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '8px',
    },
    addresses: {
        marginTop: '10px',
        padding: '5px 5px',
        flexDirection: 'row',
        fontSize: '12px',
    },
    address: {
        flexGrow: 1,
        flexDirection: 'column',
        rowGap: 2,
    },
    bold: {
        fontWeight: 'bold',
    },
    leftBorder: {
        borderLeft: '1px solid #e5e5e5',
    },
    ordersummary: {
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
        textAlign: 'center',
        fontSize: '10px',
        margin: '20px 0',
        padding: '2px 0',
    },
    singleItem: {
        flexDirection: 'row',
        border: '1px dashed #e5e5e5',
        margin: '0.1in 0.1in 0 0.1in',
        padding: '4 2',
    },
    sizes: {
        flexDirection: 'row',
        fontSize: '8px',
        marginTop: '0.01in',
    },
    singlesize: {
        width: '0.6in',
        border: '1px solid grey',
        padding: 2,
    },
    imgandname: {
        flexDirection: 'row',
    },
    nameandsize: {
        padding: '0.1in',
    },
    image: {
        height: '80px',
        width: '',
        objectFit: 'scale-down',
    },
    total1: {
        display: 'flex',
        alignSelf: 'flex-end',
    },
    total2: {
        margin: '7px 0 0 0',
    },
    total3: {
        margin: '7px 0 0 5px',
        paddingBottom: '7px',
        borderBottom: '1px solid black',
    },
    total: {
        fontSize: '10px',
        display: 'flex',
        alignSelf: 'flex-end',
    },
});
const sectionStyles = StyleSheet.create({
    headers: {
        flexDirection: 'row',
        fontSize: '7px',
        backgroundColor: 'black',
        color: 'white',
        padding: '4 2',
        margin: '0 0.1in',
    },
    h1: {
        width: '0.4in',
    },
    h2: {
        width: '3.8in',
    },
    h3: {
        width: '0.9in',
        textAlign: 'center',
    },
    h4: {
        width: '0.9in',
        textAlign: 'center',
    },
    h5: {
        width: '0.9in',
        textAlign: 'center',
    },
    h6: {
        flexGrow: 1,
        textAlign: 'center',
    },
    section1: {
        width: '0.4in',
        borderRight: '1px solid #e5e5e5',
    },
    section2: {
        width: '3.8in',
        borderRight: '1px solid #e5e5e5',
    },
    section3: {
        width: '0.9in',
        textAlign: 'center',
        fontSize: '10px',
        borderRight: '1px solid #e5e5e5',
    },
    section4: {
        width: '0.9in',
        textAlign: 'center',
        fontSize: '10px',
        borderRight: '1px solid #e5e5e5',
    },
    section5: {
        width: '0.9in',
        textAlign: 'center',
        fontSize: '10px',
        borderRight: '1px solid #e5e5e5',
    },
    section6: {
        flexGrow: 1,
        textAlign: 'right',
        fontSize: '8px',
        padding: '0 4',
    },
});
const styles3 = StyleSheet.create({
    amounts: {
        borderTop: '1px solid black',
        marginTop: '0.2in',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: '10px',
        padding: '0.2in 0.1in',
    },
    advance: {
        backgroundColor: 'yellow',
    },
    totals: {
        fontSize: '10px',
    },
    totalsRow: {
        borderBottom: 'none',
        flexDirection: 'row',
        padding: '0.05in',
    },
    totalsLeft: {
        width: '1.5in',
    },
    totalsRight: {
        width: '0.8in',
        display: 'flex',
        alignSelf: 'flex-end',
        textAlign: 'right',
    },
});
const last = StyleSheet.create({
    section: {
        margin: '0.2in',
        fontSize: '12px',
    },
    sectionTitle: {
        margin: '0.2in 0 0.1in 0',
        textDecoration: 'underline',
    },
});

function InvoicePDF({ selectedBuyer, orderDetails, getTotalQuantity }) {
    const IGST = 12;
    const [totals, setTotals] = useState({
        totalQuantity: 0,
        totalIgst: 0,
        totalPrice: 0,
    });

    useEffect(() => {
        if (orderDetails?.styles?.length) {
            let totalQuantity = 0,
                totalIgstVal = 0,
                totalPrice = 0;
            orderDetails?.styles?.forEach((style) => {
                const { quantity, price, upcharge, amount, upchargeAmount, igstAmount, total } =
                    getAmounts(style);
                totalQuantity += quantity;
                totalIgstVal += igstAmount;
                totalPrice += total;
            });
            setTotals((totals) => ({
                ...totals,
                totalQuantity: totalQuantity,
                totalIgst: totalIgstVal,
                totalPrice: totalPrice,
            }));
        }
    }, [orderDetails?.styles]);

    const getAmounts = (style) => {
        const selectedStyle = style?.selectedStyle;
        const quantity = getTotalQuantity(style?.sizes || {});
        const price = parseFloat(selectedStyle?.price) || 0;
        const upcharge = parseFloat(selectedStyle?.upcharge) || 0;
        const amount = price * quantity;
        const upchargeAmount = (upcharge / 100) * amount;
        const igstAmount = 0.12 * amount;
        const total = amount + upchargeAmount + igstAmount;

        return {
            quantity,
            price,
            upcharge,
            amount,
            upchargeAmount,
            igstAmount,
            total,
        };
    };
    return (
        <Document style={styles.doc}>
            <Page size='A4' style={styles.page} wrap>
                <View style={styles.top}>
                    <Text>Angel Bay</Text>
                    <Text style={styles.bold}>GSTIN - 08ACBPK4426F1ZW</Text>
                    <Text>Tax Invoice</Text>
                </View>
                <Image
                    src={ablogo}
                    style={{ height: '50px', objectFit: 'scale-down', marginTop: '10px' }}
                />

                <View style={styles.addresses}>
                    <View style={styles.address}>
                        <Text style={styles.bold}>Angel Bay - Patterns India</Text>
                        <Text>C84A, Ram Das Marg, Tilak Nagar</Text>
                        <Text>Jaipur, Rajasthan - 302004</Text>
                        <Text>Contact : 8233933313</Text>
                    </View>
                    <View style={styles.address}>
                        <Text style={styles.bold}>Ship To:</Text>
                        <Text>{selectedBuyer?.companyName}</Text>
                        <Text>{selectedBuyer?.personOfContact}</Text>
                        <Text>{selectedBuyer?.contactNumber}</Text>
                    </View>
                </View>
                <View style={styles.ordersummary}>
                    <Text>Order Summary</Text>
                </View>

                <View style={sectionStyles.headers}>
                    <Text style={sectionStyles.h1}>SNo.</Text>
                    <Text style={sectionStyles.h2}>Style Details.</Text>
                    <Text style={sectionStyles.h3}>Total Qty.</Text>
                    <Text style={sectionStyles.h4}>Rate Per Pc</Text>
                    <Text style={sectionStyles.h5}>Upcharge Per Pc</Text>
                    <Text style={sectionStyles.h6}>Total INR</Text>
                </View>

                {orderDetails?.styles?.map((style, i) => {
                    const { quantity, price, upcharge, amount, upchargeAmount, igstAmount, total } =
                        getAmounts(style);
                    return (
                        <View style={styles.singleItem} wrap={false} key={i}>
                            <View style={sectionStyles.section1}>
                                <Text>1</Text>
                            </View>
                            <View style={sectionStyles.section2}>
                                <View style={styles.imgandname}>
                                    <View>
                                        <Image src={img} style={styles.image} />
                                    </View>
                                    <View style={styles.nameandsize}>
                                        <Text>
                                            {style.selectedStyle?.serialNumber}&nbsp;/&nbsp;
                                            {style.selectedStyle?.styleCode || '-'}
                                        </Text>
                                        <Text>{style.selectedStyle?.name}</Text>
                                        <View>
                                            <View style={styles.sizes}>
                                                <Text style={styles.singlesize}>
                                                    XS: {style.sizes?.[SIZE.XS] || 0}
                                                </Text>
                                                <Text style={styles.singlesize}>
                                                    S: {style.sizes?.[SIZE.S] || 0}
                                                </Text>
                                                <Text style={styles.singlesize}>
                                                    M: {style.sizes?.[SIZE.M] || 0}
                                                </Text>
                                                <Text style={styles.singlesize}>
                                                    L: {style.sizes?.[SIZE.L] || 0}
                                                </Text>
                                            </View>
                                            <View style={styles.sizes}>
                                                <Text style={styles.singlesize}>
                                                    XL: {style.sizes?.[SIZE.XL] || 0}
                                                </Text>
                                                <Text style={styles.singlesize}>
                                                    2XL: {style.sizes?.[SIZE.XXL] || 0}
                                                </Text>
                                                <Text style={styles.singlesize}>
                                                    3XL: {style.sizes?.[SIZE.XXXL] || 0}
                                                </Text>
                                                <Text style={styles.singlesize}>
                                                    FS: {style.sizes?.[SIZE.FS] || 0}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={sectionStyles.section3}>
                                <Text>{quantity}</Text>
                            </View>

                            <View style={sectionStyles.section4}>
                                <Text>{price}/-</Text>
                            </View>

                            <View style={sectionStyles.section5}>
                                <Text style={{ fontSize: '8px' }}>@{style?.upcharge}%</Text>
                                <Text style={{ marginTop: '10px' }}>{upcharge}/-</Text>
                            </View>

                            <View style={sectionStyles.section6}>
                                <Text style={styles.total1}>{amount}/-</Text>
                                <View style={styles.total2}>
                                    <Text style={styles.total1}>+Upcharge</Text>
                                    <Text style={styles.total1}>
                                        {upchargeAmount}
                                        /-
                                    </Text>
                                </View>
                                <View style={styles.total3}>
                                    <Text style={styles.total1}>+IGST(@12%)</Text>
                                    <Text style={styles.total1}>
                                        {igstAmount}
                                        /-
                                    </Text>
                                </View>
                                <Text style={styles.total}>{total}/-</Text>
                            </View>
                        </View>
                    );
                })}

                <View style={styles3.amounts}>
                    <View style={styles3.totals}>
                        <View style={styles3.totalsRow}>
                            <Text style={styles3.totalsLeft}>Total Payable:</Text>
                            <View style={styles3.totalsRight}>
                                <Text>{Math.round(totals?.totalPrice || 0)}/-</Text>
                            </View>
                        </View>
                        <View style={[styles3.totalsRow, styles3.advance]}>
                            <Text style={styles3.totalsLeft}>30% Advance:</Text>
                            <View style={styles3.totalsRight}>
                                <Text>{Math.round(0.3 * (totals?.totalPrice || 0))}/-</Text>
                            </View>
                        </View>
                        <View style={[styles3.totalsRow]}>
                            <Text style={styles3.totalsLeft}>Remaining Payable:</Text>
                            <View style={styles3.totalsRight}>
                                <Text>
                                    {Math.round(totals?.totalPrice || 0) -
                                        Math.round(0.3 * (totals?.totalPrice || 0))}
                                    /-
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles3.totals}>
                        <Text style={styles3.totalsRow}>Breakup</Text>
                        <View style={styles3.totalsRow}>
                            <Text style={styles3.totalsLeft}>Amount before Tax:</Text>
                            <Text style={styles3.totalsRight}>
                                {Math.round(totals?.totalPrice || 0) -
                                    Math.round(totals?.totalIgst || 0)}
                                /-
                            </Text>
                        </View>
                        <View style={styles3.totalsRow}>
                            <Text style={styles3.totalsLeft}>IGST Total:</Text>
                            <Text style={styles3.totalsRight}>
                                {Math.round(totals?.totalIgst || 0)}/-
                            </Text>
                        </View>
                        <View style={[styles3.totalsRow]}>
                            <Text style={styles3.totalsLeft}>Total with Tax:</Text>
                            <Text style={styles3.totalsRight}>
                                {Math.round(totals?.totalPrice || 0)}/-
                            </Text>
                        </View>
                    </View>
                </View>

                <View>
                    <Text>
                        Please pay the advance amout so we can begin processing your order at the
                        earliest possible.
                    </Text>
                    <Text>
                        Please find Bank Details,Terms and Conditions attached in the last sheet of
                        this PDF.
                    </Text>
                    <Text>Certified that above particulars are true and correct.</Text>
                    <Text>Patters India Authorised Signatory</Text>
                </View>
            </Page>
            <Page size='A4' style={styles.page}>
                <View style={last.section}>
                    <Text style={last.sectionTitle}>Please Note</Text>
                    <Text>
                        - Transportation charges would be on the buyer's side. Please let us know if
                        you have any preferences.
                    </Text>
                    <Text>
                        - Your order processing will begin once the 30% advance amout has been paid.
                    </Text>

                    <Text style={last.sectionTitle}>Damages and Issues</Text>
                    <Text>
                        - Please inspect your order upon reception and contact us immediately if the
                        item is defective, damaged or if you have recieved the wrong item.
                    </Text>
                    <Text>- Damages must be reported within 24hours.</Text>
                    <Text>
                        - The item must be in the original condition as received, unused and unworn
                        and must have it's tag and original packing.
                    </Text>
                    <Text>
                        - Please keep your proof of purchase handy for an easy return / exchange
                        process.
                    </Text>
                    <Text>
                        - The item must be in the original condition as received, unused and unworn
                        and must have it's tag and original packing.
                    </Text>
                    <Text>
                        - Please keep your proof of purchase handy for an easy return / exchange
                        process.
                    </Text>

                    <Text style={last.sectionTitle}>Bank Details</Text>
                    <Text>BENEFICIARY ACCOUNT NAME:</Text>
                    <Text>BENEFICIARY ADDRESS</Text>
                    <Text>BENEFICIARY ACCOUNT NUMBER</Text>
                    <Text>BANK NAME</Text>
                    <Text>BANK IFSC CODE</Text>
                    <Text>BANK ADDRESS</Text>
                </View>
            </Page>
        </Document>
    );
}

export default InvoicePDF;
