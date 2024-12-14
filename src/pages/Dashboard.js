import React from 'react';

const Home = () => {
  return (
    <>
      {/* Inline CSS Styles */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Elbasan&family=Poppins:ital,wght@0,0.1..0,0.9&display=swap');

          * {
            font-family: "Poppins", serif;
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }

          body {
            margin: 0;
            height: 100vh;
          }

          h1 {
            font-size: 48px;
            color: #f7f7f7;
          }

          a {
            text-decoration: none;
            color: #f7f7f7;
          }

          .container {
            display: flex;
            height: 100vh;
          }

          .side {
            position: relative;
            height: 100vh;
            flex-direction: column;
            width: 17vw;
            padding: 2rem;
            background-color: #292929;
          }

          .sideHeader {
            font-size: 1.5em;
            margin-bottom: 20px;
            color: #f7f7f7;
          }

          .sideList {
            margin: 6rem 1rem;
          }

          .sideListItem {
            list-style: none;
            margin: 26px;
          }

          .sideListItem a {
            color: #f7f7f7;
            font-size: 20px;
          }

          .logout {
            font-size: 20px;
            position: absolute;
            bottom: 5rem;
            left: 6rem;
            color: #f7f7f7;
            background-color: transparent;
            border: none;
            cursor: pointer;
          }

          .center {
            display: flex;
            height: 100vh;
            background-color: #f7f7f7;
            flex-grow: 1;
            position: relative;
          }

          .top {
            flex-grow: 1;
            display: flex;
            background-color: #59A895;
            height: 300px;
          }

          .header {
            flex-grow: 1;
            display: flex;
            background-color: #292929;
            height: 150px;
            width: 100%;
            position: absolute;
            top: 5rem;
            left: 5rem;
            flex-direction: column;
            padding: 20px;
          }

          .headerText {
            margin: 4rem;
            font-size: 64px;
            color: #f7f7f7;
          }

          .box {
            background-color: #59A895;
            height: 200px;
            width: 200px;
            position: absolute;
            border-radius: 20px;
            text-align: center;
            line-height: 200px;
            font-size: 1.2em;
            color: #fff;
            cursor: pointer;
            text-decoration: none;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s ease, border 0.3s ease;
          }

          .box:hover {
            background-color: #292929;
            border: #292929 4px solid;
          }

          .userBox {
            left: 5rem;
            top: 20rem;
          }

          .catBox {
            left: 34.5rem;
            top: 20rem;
          }

          .productBox {
            left: 63rem;
            top: 20rem;
          }

          .mediaBox {
            left: 5rem;
            top: 37rem;
          }

          .salesBox {
            left: 34.5rem;
            top: 37rem;
          }

          .reportBox {
            left: 63rem;
            top: 37rem;
          }
        `}
      </style>

      {/* Sidebar and Main content */}
      <div className="container">
        {/* Sidebar */}
        <aside className="side">
          <h1 className="sideHeader">Inventory System</h1>
          <ul className="sideList">
            <li className="sideListItem"><a href="/dashboard">DASHBOARD</a></li>
            <li className="sideListItem"><a href="/usermanage">USER MANAGEMENT</a></li>
            <li className="sideListItem"><a href="/category">CATEGORY</a></li>
            <li className="sideListItem"><a href="/product">PRODUCTS</a></li>
          </ul>
          <a className="logout" href="/" onClick={() => window.confirm('Are you sure?')}>
            LogOut
          </a>
        </aside>

        <div className="center">
          <div className="top"></div>
          <div className="header">
            <h1 className="headerText">HOME</h1>
          </div>
          <a className="box userBox" href="/usermanage">USER MANAGEMENT</a>
          <a className="box catBox" href="/category">CATEGORIES</a>
          <a className="box productBox" href="product.php">PRODUCTS</a>
          <a className="box mediaBox" href="#">MEDIA</a>
          <a className="box salesBox" href="#">SALES</a>
          <a className="box reportBox" href="#">REPORT</a>
        </div>
      </div>
    </>
  );
};

export default Home;
