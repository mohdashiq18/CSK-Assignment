import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "./chart";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import linkedinPng from "./linkedin.png"
import Image from "next/image";
const StockDetails = () => {
  const [intrest, setIntrest] = useState("Buy")
  const [activeTab, setActiveTab] = useState("income");
  const [inStatement, setInStatement] = useState([])
  const [balanceSheet, setBalanceSheet] = useState([])
  const [casFlow, setCashFlow] = useState([])
  const [fundamentals, setFundamentals] = useState({})
  const [xaxisData, setXaxisData] = useState([])
  const [yaxisData, setYaxisData] = useState([])
  const [shareholding, setShareholding] = useState([])
  const [promoters, setPromoters] = useState([])
  const [activeChart, setActiveChart] = useState("monthly")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",

  });
  const data = {
    labels: xaxisData,
    datasets: [
      {
        label: 'Sales Over Months',
        data: yaxisData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log("check", formData)
  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/sheet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, intrest: intrest }),
    });
    const result = await response.json();
    alert("Add Successfully In Excel Sheet")
    setFormData({
      name: "",
      email: "",
      phone: "",
      quantity: "",
      message: "",

    })
    console.log(result);
  };
  useEffect(() => {
    axios.get("http://localhost:3000/api/financials_income_api").then((res) => setInStatement(res.data.data)).catch((err) => console.log(err))
    axios.get("http://localhost:3000/api/financials_balancesheet_api").then((res) => setBalanceSheet(res.data.data)).catch((err) => console.log(err))
    axios.get("http://localhost:3000/api/financials_cash_flow_api").then((res) => setCashFlow(res.data.data)).catch((err) => console.log(err))
    axios.get("http://localhost:3000/api/fundamentals").then((res) => setFundamentals(res.data.data)).catch((err) => console.log(err))
    axios.get("http://localhost:3000/api/shareholding_api").then((res) => setShareholding(res.data.data)).catch((err) => console.log(err))
    axios.get("http://localhost:3000/api/promoters_api").then((res) => setPromoters(res.data.data)).catch((err) => console.log(err))
    getCartData("monthly")
  }, [])
  const getCartData = (period) => {
    if (period == "monthly") {
      axios.get("http://localhost:3000/api/monthlyChartData").then((res) => {
        const Data = res.data.data
        setXaxisData(Object.keys(Data[0]))
        setYaxisData(Object.values(Data[0]))
      }).catch((err) => console.log(err))
    }
    else if (period == "weekly") {
      axios.get("http://localhost:3000/api/weeklyChart").then((res) => {
        const Data = res.data.data
        setXaxisData(Object.keys(Data[0]))
        setYaxisData(Object.values(Data[0]))
      }).catch((err) => console.log(err))
    }
    else {
      axios.get("http://localhost:3000/api/monthlyChartData").then((res) => {
        const Data = res.data.data
        setXaxisData(Object.keys(Data[0]))
        setYaxisData(Object.values(Data[0]))
      }).catch((err) => console.log(err))
    }

  }
  return (
    <div className="stock-container">
      {/* Left Side - Stock Info */}
      <div className="stock-info">
        <div className="stock-header">
          <img
            src="https://cdn.prod.website-files.com/66dad9c594a45d74898a5fc6/66e9a5d287ad4d164a1788ae_70521baac89be4d4cb2f223bbf67c974%20(1).avif"
            alt="CSK Logo"
            width={100}
            height={100}
            className="stock-logo"
          />
          <h2>Chennai Super Kings (CSK) Share Price</h2>
          <p className="price">₹188 <span className="change">-30</span> <span className="change">-13.8%</span> <span className="change-last">4M</span></p>
        </div>

        {/* Graph Placeholder */}
        <div className="graph">
          <div style={{ display: 'flex', justifyContent: 'end', gap: 20, marginRight: 20 }}>
            <button style={{ background: activeChart == "monthly" ? '#34c759' : '#bebebe', padding: "1% 3%", color: "white", borderRadius: 5 }} onClick={() => {
              setActiveChart("monthly")
              getCartData("monthly")
            }}>Monthly</button>
            <button style={{ background: activeChart == "weekly" ? '#34c759' : '#bebebe', padding: "1% 3%", color: "white", borderRadius: 5 }} onClick={() => {
              setActiveChart("weekly")
              getCartData("weekly")
            }}>Weekly</button>
            <button style={{ background: "#bebebe", padding: "1% 3%", color: "white", borderRadius: 5 }}>Daily</button>
          </div>
          <Chart data={data} />
        </div>

        {/* About Section */}
        <div className="about">
          <h3>About Share</h3>
          <p>
            Chennai Super Kings (CSK) is an Indian professional cricket franchise based in Chennai, Tamil Nadu. The team competes in the Indian Premier League (IPL) and was one of the eight franchises incorporated when the league was established in 2008. The team plays its home matches at the M. A. Chidambaram Stadium and is owned by Chennai Super Kings Cricket.
            <br></br><br></br>
            The Super Kings is the joint-most successful IPL franchise, having won five IPL titles (along with Mumbai Indians). In the IPL, it has appeared in a 10 finals and qualified for the playoff stages 12 times, the most amongst the IPL teams. The franchise has also won the Champions League Twenty20 twice in 2010 and 2014. The team is currently captained by Ruturaj Gaikwad and coached by Stephen Fleming.
            <br></br><br></br>
            The Super Kings was suspended for two years from the IPL starting July 2015 due to the involvement of its owners in the 2013 IPL betting case. The frachise re-joined the IPL for the 2018 season and won the title in its comeback season. In January 2022, CSK became India's first unicorn sports enterprise. As of 2022, it was the second most valuable IPL franchise with a valuation of $1.15 billion.
          </p>
        </div>

        {/* Fundamentals */}
        <div className="fundamentals">
          <h3>Fundamentals</h3>
          {fundamentals.length > 0 && <div className="fundamentals-table">
            <table>
              <tbody>
                <tr><td>Chennai Super Kings (CSK) Shares</td><td className="fundamental-td" >{fundamentals[0]["Chennai Super Kings (CSK) Shares"]}</td></tr>
                <tr><td>Lot Size</td><td className="fundamental-td">{fundamentals[0]["Lot Size"]}</td></tr>
                <tr><td>52 Week High</td><td className="fundamental-td">{fundamentals[0]["52 Week High"]}</td></tr>
                <tr><td>52 Week Low</td><td className="fundamental-td">{fundamentals[0]["52 Week Low"]}</td></tr>
                <tr><td>Depository</td><td className="fundamental-td">{fundamentals[0]["Depository"]}</td></tr>
                <tr><td>PAN Number</td><td className="fundamental-td">{fundamentals[0]["PAN Number"]}</td></tr>
                <tr><td>ISIN Number</td><td className="fundamental-td">{fundamentals[0]["ISIN Number"]}</td></tr>
                <tr><td>CIN</td><td className="fundamental-td">{fundamentals[0]["CIN"]}</td></tr>
                <tr><td>RTA</td><td className="fundamental-td">{fundamentals[0]["RTA"]}</td></tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr><td>Market Cap (in cr)</td><td className="fundamental-td">{fundamentals[0]["Market Cap (in cr)"]}</td></tr>
                <tr><td>P/E Ratio</td><td className="fundamental-td">{fundamentals[0]["P/E Ratio"]}</td></tr>
                <tr><td>P/B Ratio</td><td className="fundamental-td">{fundamentals[0]["P/B Ratio"]}</td></tr>
                <tr><td>Debt to Equity</td><td className="fundamental-td">{fundamentals[0]["Debt to Equity"]}</td></tr>
                <tr><td>ROE (%)</td><td className="fundamental-td">{fundamentals[0]["Book Value"]}</td></tr>
                <tr><td>Book Value</td><td className="fundamental-td">{fundamentals[0]["Book Value"]}</td></tr>
                <tr><td>Face Value</td><td className="fundamental-td">{fundamentals[0]["Face Value"]}</td></tr>
                <tr><td>Valuation</td><td className="fundamental-td">{fundamentals[0]["Valuation"]}</td></tr>
                <tr><td>Total Shares</td><td className="fundamental-td" style={{ fontWeight: "bold" }}>{fundamentals[0]["Total Shares"]}</td></tr>
              </tbody>
            </table>
          </div>}
        </div>

        {/* Financials */}
        <div className="stock-infon">
          <h3>Financials (In Cr)</h3>

          {/* Tab Navigation */}
          <div className="tabs">
            <span
              className={activeTab === "income" ? "active" : ""}
              onClick={() => setActiveTab("income")}
            >
              Income Statement
            </span>
            <span
              className={activeTab === "balance" ? "active" : ""}
              onClick={() => setActiveTab("balance")}
            >
              Balance Sheet
            </span>
            <span
              className={activeTab === "cashflow" ? "active" : ""}
              onClick={() => setActiveTab("cashflow")}
            >
              Cash Flow
            </span>
          </div>

          {/* Income Statement Tab */}
          {activeTab === "income" && (
            <table className="financial-table">
              <thead>
                <tr>
                  <td>
                    P&L Statement
                  </td>
                  <td>
                    2021
                  </td>
                  <td>
                    2022
                  </td>
                  <td>
                    2023
                  </td>
                  <td>
                    2024
                  </td>
                </tr>

              </thead>
              <tbody>
                {inStatement?.map((el, i) => <tr key={i}>
                  <td >{el["P&L Statement"]}</td>
                  <td >{el["2021"]}</td>
                  <td >{el["2022"]}</td>
                  <td >{el["2023"]}</td>
                  <td >{el["2024"]}</td>
                </tr>)}

              </tbody>
            </table>
          )}

          {/* Balance Sheet Tab */}
          {activeTab === "balance" && (
            <table className="financial-table">
              <thead>
                <tr>
                  <td>
                    Assets
                  </td>
                  <td>
                    2021
                  </td>
                  <td>
                    2022
                  </td>
                  <td>
                    2023
                  </td>
                  <td>
                    2024
                  </td>
                </tr>

              </thead>
              <tbody>
                {balanceSheet?.map((el, i) => <tr key={i}>
                  <td >{el["Assets"]}</td>
                  <td >{el["2021"]}</td>
                  <td >{el["2022"]}</td>
                  <td >{el["2023"]}</td>
                  <td >{el["2024"]}</td>
                </tr>)}
              </tbody>
            </table>
          )}

          {/* Cash Flow Tab */}
          {activeTab === "cashflow" && (
            <table className="financial-table">
              <thead>
                <tr>
                  <td>
                    Cash-Flow Statement
                  </td>
                  <td>
                    2021
                  </td>
                  <td>
                    2022
                  </td>
                  <td>
                    2023
                  </td>
                  <td>
                    2024
                  </td>
                </tr>

              </thead>
              <tbody>
                {casFlow?.map((el, i) => <tr key={i}>
                  <td >{el["Cash-Flow Statement"]}</td>
                  <td >{el["2021"]}</td>
                  <td >{el["2022"]}</td>
                  <td >{el["2023"]}</td>
                  <td >{el["2024"]}</td>
                </tr>)}
              </tbody>
            </table>
          )}
        </div>


        {/* Shareholding */}
        <div className="stock-infon">
          <h3>Shareholding Pattern</h3>
          <table className="financial-table">
            <thead>
              <tr>
                <td>
                  Shareholding Pattern
                </td>
                <td>
                  2021
                </td>
                <td>
                  2022
                </td>
                <td>
                  2023
                </td>
                <td>
                  2024
                </td>
              </tr>

            </thead>
            <tbody>
              {shareholding?.map((el, i) => <tr key={i}>
                <td >{el["Shareholding Pattern"]}</td>
                <td >{el["2021"]}</td>
                <td >{el["2022"]}</td>
                <td >{el["2023"]}</td>
                <td >{el["2024"]}</td>
              </tr>)}

            </tbody>
          </table>
        </div>



        {/* Promoters or Management */}
        <div className="stock-infon">
          <h3>Promoters or Management</h3>
          <table style={{ width: "100%" }} className="financial-table">
            <thead>
              <tr>
                <td>
                  Name
                </td>
                <td>
                  Designation
                </td>
                <td>
                  Experience
                </td>
                <td>
                  Linkedin Profile
                </td>
              </tr>

            </thead>
            <tbody>
              {promoters?.map((el, i) => <tr key={i}>
                <td >{el["Name"]}</td>
                <td >{el["Designation"]}</td>
                <td >{el["Experience"]}</td>
                <td style={{ textAlign: "center" }} >
                  <a href={el["Linkedin Profile"]}>
                    <Image
                      src={linkedinPng}      // Imported image module
                      alt="Description of image"
                      width={20}
                      height={20}
                    />
                    {/* <img src={linkedinPng}/> */}
                  </a>
                </td>
              </tr>)}

            </tbody>
          </table>
        </div>
      </div>

      {/* Right Side - Buy Form */}
      <div className="buy-form">
        <div className="buy-form-container">
          <div className="div-tab-buySell">
            <span className={intrest == "Buy" ? "active" : "diactive"} onClick={() => {
              setIntrest("Buy")
            }}>Buy</span>
            <span className={intrest != "Buy" ? "active" : "diactive"} onClick={() => {
              setIntrest("Sell")
            }}>Sell</span>
            {/* <h3>Buy</h3> */}
          </div>
          <div className="form-div">
            <div className="form-heading">
              <h5>
                Chennai Super Kings (CSK) Shares
              </h5>

              <h5 className="intrest-subtitel">{intrest == "Buy" ? "₹ 188" : "* Best In Industry"}</h5>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">

                  <PhoneInput
                    country={'in'} // Default country
                    name="phone"
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e });
                    }}
                    value={formData.phone}
                    enableSearch={true} // Enable search for countries
                    disableSearchIcon={true} // Hide the search icon
                    inputStyle={{
                      width: '100%',
                      color: "#757575",
                      border: "1px solid #0000001a"
                    }} // Style the input
                  />

                </div>

                <div className="form-group">
                  <input
                    type="number"
                    id="quantity"
                    placeholder="Quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button className="by-button" type="submit">{intrest}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
