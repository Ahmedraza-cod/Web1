let a = document.getElementById("le");
let b = document.getElementById("we");
let c = document.getElementById("hi");
let d = document.getElementById("dew");
let weight = document.getElementById("val-1");

function calculateWeight() {

    let l = parseFloat(a.value) || 0;
    let w = parseFloat(b.value) || 0;
    let h = parseFloat(c.value) || 0;
    let denseWeight = parseFloat(d.value) || 0;

    let volumetricWeight = (l * w * h) / 5000;

    if (volumetricWeight > denseWeight) {
        weight.value = volumetricWeight;
    } else {
        weight.value = denseWeight;
    }
}

a.addEventListener("input", calculateWeight);
b.addEventListener("input", calculateWeight);
c.addEventListener("input", calculateWeight);
d.addEventListener("input", calculateWeight);

calculateWeight();


let charge = document.getElementById("tc");
let gst = document.getElementById("gst");
let total = document.getElementById("ta");

function calc() {

    let amount = parseFloat(charge.value) || 0;

    let rate = (amount * 15) / 100;

    gst.value = rate.toFixed(2);

    total.value = (amount + rate).toFixed(2);
}

charge.addEventListener("input", calc);
gst.addEventListener("input", calc);
total.addEventListener("input", calc);

 



document.getElementById("generateSlip").addEventListener("click", function () {

    // Consignee
    let consigneePhone = document.querySelector(
        ".consignee-row .form-group:nth-child(1) input"
    ).value;

    let consigneeName = document.querySelector(
        ".consignee-row .form-group:nth-child(2) input"
    ).value;

    let consigneeCnic = document.querySelector(
        ".consignee-row .form-group:nth-child(3) input"
    ).value;

    let consigneeAddress = document.querySelector(
        ".consignee-row .form-group:nth-child(4) textarea"
    ).value;


    // Shipper
    let shipperPhone = document.querySelector(
        ".shipper-row .form-group:nth-child(1) input"
    ).value;

    let shipperName = document.querySelector(
        ".shipper-row .form-group:nth-child(2) input"
    ).value;

    let shipperCnic = document.querySelector(
        ".shipper-row .form-group:nth-child(3) input"
    ).value;

    let shipperAddress = document.querySelector(
        ".shipper-row .form-group:nth-child(4) textarea"
    ).value;


    // Shipment
    let destination = document.getElementById("dest").selectedOptions[0].text;
    let service = document.getElementById("ser").selectedOptions[0].text;
    let paymentMode = document.getElementById("md").selectedOptions[0].text;

    let length = document.getElementById("le").value;
    let width = document.getElementById("we").value;
    let height = document.getElementById("hi").value;

    let weightValue = document.getElementById("val-1").value;

    let pieces = document.querySelector(
        ".weight .form-group:nth-child(2) input"
    ).value;

    let transactionId = document.getElementById("pay").value;

    let coupon = document.getElementById("cp").value;
    let packageContent = document.getElementById("pa-co").value;
    let specialInstruction = document.getElementById("sp-in").value;
    let referralCode = document.getElementById("ref").value;


    // Charges
    let charges = document.getElementById("tc").value;
    let gstValue = document.getElementById("gst").value;
    let totalAmount = document.getElementById("ta").value;
    
    function getNextSlipNumber() {
    let number = Number(localStorage.getItem("slipNumber") || 0) + 1;
    localStorage.setItem("slipNumber", number);

    return String(number).padStart(12, "0");
}




    // Slip window
    let slipWindow = window.open("", "_blank", "width=900,height=900");

    slipWindow.document.write(`
    
    <!DOCTYPE html>
    <html>
    <head>

        <title>${getNextSlipNumber()}</title>

        <style>

            * {
                box-sizing: border-box;
            }

            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                color: #222;
            }

            .slip {
                width: 800px;
                margin: auto;
                border: 2px solid #222;
                padding: 20px;
            }

            .header {
                text-align: center;
                border-bottom: 2px solid #222;
                padding-bottom: 12px;
                margin-bottom: 15px;
            }

            .header h1 {
                margin: 0;
                font-size: 25px;
            }

            .header p {
                margin: 5px 0;
                font-size: 13px;
            }

            .section-title {
                background: #eeeeee;
                border: 1px solid #333;
                padding: 7px;
                font-weight: bold;
                margin-top: 15px;
            }

            .two-column {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
            }

            .box {
                border: 1px solid #333;
                padding: 10px;
                min-height: 130px;
            }

            .box h3 {
                margin: 0 0 8px;
                font-size: 16px;
                border-bottom: 1px solid #aaa;
                padding-bottom: 5px;
            }

            .row {
                display: flex;
                margin: 5px 0;
                font-size: 13px;
            }

            .label {
                font-weight: bold;
                width: 125px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
            }

            th,
            td {
                border: 1px solid #333;
                padding: 8px;
                font-size: 13px;
                text-align: left;
            }

            th {
                background: #eeeeee;
            }

            .charges {
                width: 350px;
                margin-left: auto;
                margin-top: 15px;
            }

            .total {
                font-size: 16px;
                font-weight: bold;
            }

            .footer {
                margin-top: 25px;
                border-top: 1px solid #333;
                padding-top: 10px;
                text-align: center;
                font-size: 11px;
            }

            .print-btn {
                text-align: center;
                margin: 20px;
            }

            .print-btn button {
                padding: 10px 25px;
                font-size: 15px;
                cursor: pointer;
            }

            @media print {

                body {
                    padding: 0;
                }

                .slip {
                    width: 100%;
                    border: 2px solid #222;
                }

                .print-btn {
                    display: none;
                }

            }

        </style>

    </head>

    <body>

        <div class="slip">

            <div class="header">

                <h1>SHIPMENT BOOKING SLIP</h1>

                <p>Courier / Shipment Booking</p>

                <p>Generated from Booking Portal</p>

            </div>


            <div class="section-title">
                CONSIGNEE INFORMATION
            </div>

            <div class="box">

                <div class="row">
                    <div class="label">Name:</div>
                    <div>${consigneeName}</div>
                </div>

                <div class="row">
                    <div class="label">Phone:</div>
                    <div>${consigneePhone}</div>
                </div>

                <div class="row">
                    <div class="label">CNIC:</div>
                    <div>${consigneeCnic}</div>
                </div>

                <div class="row">
                    <div class="label">Address:</div>
                    <div>${consigneeAddress}</div>
                </div>

            </div>


            <div class="section-title">
                SHIPPER INFORMATION
            </div>

            <div class="box">

                <div class="row">
                    <div class="label">Name:</div>
                    <div>${shipperName}</div>
                </div>

                <div class="row">
                    <div class="label">Phone:</div>
                    <div>${shipperPhone}</div>
                </div>

                <div class="row">
                    <div class="label">CNIC:</div>
                    <div>${shipperCnic}</div>
                </div>

                <div class="row">
                    <div class="label">Address:</div>
                    <div>${shipperAddress}</div>
                </div>

            </div>


            <div class="section-title">
                SHIPMENT INFORMATION
            </div>

            <table>

                <tr>
                    <th>Destination</th>
                    <th>Service</th>
                    <th>Weight</th>
                    <th>Pieces</th>
                </tr>

                <tr>
                    <td>${destination}</td>
                    <td>${service}</td>
                    <td>${weightValue}</td>
                    <td>${pieces}</td>
                </tr>

            </table>


            <table>

                <tr>
                    <th>Length</th>
                    <th>Width</th>
                    <th>Height</th>
                    <th>Payment Mode</th>
                </tr>

                <tr>
                    <td>${length} cm</td>
                    <td>${width} cm</td>
                    <td>${height} cm</td>
                    <td>${paymentMode}</td>
                </tr>

            </table>


            <div class="section-title">
                PACKAGE DETAILS
            </div>

            <div class="box">

                <div class="row">
                    <div class="label">Package:</div>
                    <div>${packageContent}</div>
                </div>

                <div class="row">
                    <div class="label">Special Instruction:</div>
                    <div>${specialInstruction}</div>
                </div>

                <div class="row">
                    <div class="label">Coupon:</div>
                    <div>${coupon}</div>
                </div>

                <div class="row">
                    <div class="label">Referral Code:</div>
                    <div>${referralCode}</div>
                </div>

                <div class="row">
                    <div class="label">Transaction ID:</div>
                    <div>${transactionId}</div>
                </div>

            </div>


            <div class="charges">

                <table>

                    <tr>
                        <th>Total Charges</th>
                        <td>${charges}</td>
                    </tr>

                    <tr>
                        <th>GST</th>
                        <td>${gstValue}</td>
                    </tr>

                    <tr class="total">
                        <th>Total Amount</th>
                        <td>${totalAmount}</td>
                    </tr>

                </table>

            </div>


            <div class="footer">

                <p>Thank you for using our courier service.</p>

                <p>This is a computer generated shipment slip.</p>

            </div>

        </div>


        <div class="print-btn">

            <button onclick="window.print()">
                Print / Save as PDF
            </button>

        </div>

    </body>
    </html>

    `);

    slipWindow.document.close();
});

        let menuBtn = document.getElementById("menuBtn");
        let sidebar = document.getElementById("sidebar");

        menuBtn.addEventListener("click", function () {
            sidebar.classList.toggle("open");
        });


 








