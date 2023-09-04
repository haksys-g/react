// import React, { useEffect, useState } from 'react';

// import { Link, useHistory } from "react-router-dom";
// import qs from 'qs';
// import { Table } from 'antd';

// import { Layout, Space, Col, Row, Button, DatePicker, Input, Table } from 'antd';

import { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import qs from 'qs';
import { CloseCircleOutlined } from "@ant-design/icons";
import { Layout, Space, Col, Row, Button, DatePicker, Input, Table } from 'antd';



const columns = [
  {
    title: 'GID',
    dataIndex: 'TRN_GID',
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: '20%',
  },
//   {
//     title: 'Gender',
//     dataIndex: 'gender',
//     filters: [
//       {
//         text: 'Male',
//         value: 'male',
//       },
//       {
//         text: 'Female',
//         value: 'female',
//       },
//     ],
//     width: '20%',
//   },
  {
    title: 'MST_SEQ',
    dataIndex: 'TRN_MST_SEQ',
  },
];
 
const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
const App = () => {
  const [data, setData] = useState();
  const [proc_sts, setProcSts] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const fetchData = () => {
    setLoading(true);
    fetch(`'http://1.234.25.132:40513/api/grammars/master/?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ results }) => {
      console.log(results);
    //   setResultCount(response.data.data.count);
    //   setResultTook(response.data.data.took);
      const fileData = results.data.response.hits.hits.map((item) => {
        return{
          TRN_GID: item._source.cruzlink.TRN_GID,
          TRN_MST_SEQ: item._source.cruzlink.TRN_MST_SEQ,
      };
    });
        setData(fileData);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  function onChangeProcSts(e) {
    setProcSts(e.target.value);
    console.log(e.target.value);
  }

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.login.uuid}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
    // <Row>
    //     <Col span={12}>
    //         <Button
    //             type="primary"
    //             onClick={onClickSearch}
    //             // disabled={!hasSelected}
    //             // loading={loading}
    //             >
    //             조회
    //         </Button>
    //     </Col>
    // </Row>
    // <Row>
    //     <Col span={2}>Proc_Sts</Col>
    //     <Col span={2}>
    //         <Input
    //             placeholder="PROC_STS"
    //             value={proc_sts}
    //             // disabled="falue"
    //             onChange={onChangeProcSts}
    //         />
    //     </Col>
    // </Row>
  );
};
export default App;
