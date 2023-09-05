'use client'
import React from "react";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import "./home.scss";
import ClientCategoryChart from "@/components/charts/ClientCategoryChart";

const Home2 = () => {
  return (
    <>
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
        <div className="w-full   mx-2 h-64">

          <div >
            <Widget  />
            
          </div>
          
          <div className="listContainer mt-32">
            <div className="listTitle text-2xl">Dernieres Transactions</div>
            <Table />
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Home2;
