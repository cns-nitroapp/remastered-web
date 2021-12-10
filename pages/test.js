import React from "react";

const Index = ({ transactionList }) => <div style={{ margin: 20 }}>
    <div className="border rounded-xl w-full flex flex-wrap items-center justify-around bg-white lg:visible invisible transition-all mt-10 p-6">
            <a className="w-full flex flex-wrap items-left justify-around p-3 mb-5 rounded-xl font-medium">
              <p>From</p>
              <p>to</p>
              <p>Amount</p>
              <p>Timestamp</p>
            </a>
            {transactionList.transactions.map((x, i) => <div key={i} className="w-full flex flex-wrap items-left justify-around p-3 m-2 border rounded-xl hover:bg-lightgrey hover:ring-2 hover:ring-indigo-500 transition-all hover:ring-offset-2">
              <a className="hover:text-indigo-700 transition-all">{x.sender.name}</a>
              <a className="hover:text-indigo-700 transition-all">{x.receiver.name}</a>
              <a>{x.amount}</a>
              <a>{x.timestamp}</a>
            </div>)}
    </div>
</div>
 

class transactionData extends React.Component {
    static async getInitialProps(ctx) {
      const res = await fetch('https://api.remastered.nitroapp.de/transactions')
      const json = await res.json()
      return { transactionList: json }
    }
  
    render() {
      return Index(this.props)
    }
}
 
export default transactionData;

