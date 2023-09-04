import { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import { CloseCircleOutlined } from "@ant-design/icons";
import { Layout, Space, Col, Row, Button, DatePicker, Input, Table } from 'antd';
import Item from "antd/es/list/Item";

export default function Nospoon() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagenation] = useState({ current: 1, pageSize: 10 });

  const [sort, setSort] = useState('');
  // const [sort, setSort] = useState('cruzlink.TRN_GID.keyword');
  const [filter, setFilter] = useState('');
  const [isOff, setIsOff] = useState(true);

//  elasticserarch
  const [gid, setGid] = useState("");
  const [proc_sts, setProcSts] = useState("");
  const [resultcount, setResultCount] = useState(0);
  const [resulttook, setResultTook] = useState(0);
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

// etc
  const mounted = useRef(false);
  const [count, setCount] = useState(0);



  const columns = [
    {
      title: "순번",
      dataIndex: "ROW_NO",
      width: "5%",
      align: "center",
      // sorter: (a, b) => "",
    },
    {
      title: "GID",
      dataIndex: "TRN_GID",
      width: "5%",
      align: "left",
      sorter: (a, b) => "",
      // sortDirections: ["descend"],
    },
    {
      title: "Master_순번",
      dataIndex: "TRN_MST_SEQ",
      width: "50%",
      align: "center",
      sorter: (a, b) => "",
    },
    
  ];

  const getRandomuserParams = (params) => ({
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ordering: params.sort_query,
    ...params,
  });

  const { Header, Footer, Sider, Content } = Layout;
  const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
  };
  const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#108ee9',
  };
  const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#3ba0e9',
  };
  const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
  };
  const { RangePicker } = DatePicker;

  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  const onOk = (value) => {
    console.log('onOk: ', value);
  };


  useEffect(() => {
    // fetch({pagenation});
    console.log("count loading...", count);
  }, []);

  useEffect(() => {
    console.log("count loading...", count);
    if ( !mounted.current) {
        mounted.current = true;
    } else {
        fetch({ pagination, filter, sort });
        // console.log("useEffect...", pagination)
    }
  }, [count]);

  const fetch = (params = {}) => {
    setLoading(true);
    // console.log(params);
    // console.log(getRandomuserParams(params));
    axios({
      url: 'http://1.234.25.132:40513/api/grammars/master/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        gid: gid,
        proc_sts: proc_sts,
        params: params,
        start_date: start_date,
        end_date: end_date,
      }
    }).then((response) => {
      console.log("response..", response);
      setResultCount(response.data.data.count);
      setResultTook(response.data.data.took);
      console.log("item....", response.data.response.hits.hits);
      const fileData = response.data.response.hits.hits.map((item, key) => {
        return{
          // ROW_NO: key + 1,        
          ROW_NO: params.pagination.current == 1 ? key + 1 : ((params.pagination.current - 1) * params.pagination.pageSize) + key + 1,
          TRN_GID: item._source.cruzlink.TRN_GID,
          TRN_MST_SEQ: item._source.cruzlink.TRN_MST_SEQ,
      };
    });
      setPagenation({
        ...params.pagination,
        total: response.data.data.count,
      });
      setDataSource(fileData);
      setLoading(false);
    });
  };


  function onChangeGID(e) {
    setGid(e.target.value);
    console.log(e.target.value);
  }

  function onChangeProcSts(e) {
    setProcSts(e.target.value);
    console.log(e.target.value);
  }

  function onClickSearch(){
    console.log(gid);
    setCount(count + 1);
    setPagenation({ current: 1, pageSize: 10 });
    };

  function onClickToggle(){
    console.log('Toggle....', isOff);
    setIsOff(!isOff);
    // isOff ? 'ON' : 'OFF';
  };

    const handleTableChange = (pagination, filter, sorter) => {
      console.log('pagination....', pagination);
      // console.log(filters);
      console.log('sorter...', sorter);
      // setTableParams({
      //   pagination,
      //   filters,
      //   ...sorter,
      // });
  
      // // `dataSource` is useless since `pageSize` changed
      // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      //   setData([]);
      // }

      // const filters_dict_type = filters.dict_type_display
      //   ? filters.dict_type_display.reduce((result, item) => {
      //       console.log(item);
      //       return `${result}&dict_type=${item}`;
      //     }, "")
      //   : "";
      // console.log(filters_dict_type);
      // const filters_type = filters.type_display
      //   ? filters.type_display.reduce((result, item) => {
      //       console.log(item);
      //       return `${result}&type=${item}`;
      //     }, "")
      //   : "";
      // console.log(filters_type);
      // const filters_category = filters.category_display
      //   ? filters.category_display.reduce((result, item) => {
      //       console.log(item);
      //       return `${result}&category=${item}`;
      //     }, "")
      //   : "";
      // console.log(filters_category);
      // const filters_pos = filters.pos_display
      //   ? filters.pos_display.reduce((result, item) => {
      //       console.log(item);
      //       return `${result}&pos=${item}`;
      //     }, "")
      //   : "";
      // console.log(filters_pos);
      // const filters_status = filters.status_display
      //   ? filters.status_display.reduce((result, item) => {
      //       console.log(item);
      //       return `${result}&status=${item}`;
      //     }, "")
      //   : "";
      // console.log(filters_status);
      // const filters_query =
      //   filters_dict_type +
      //   filters_type +
      //   filters_category +
      //   filters_pos +
      //   filters_status;
      // console.log(filters_query);
      setFilter('');

      setSort(sorter.field
        ? sorter.order === "descend"
          ? "-cruzlink." + sorter.field + ".keyword"
          : "cruzlink." + sorter.field + ".keyword"
        : "cruzlink.TRN_GID.keyword");

      fetch({
        pagination,
        filter,
        sort,
      });
    }; 

  return (
    <>
        <Space
            direction="vertical"
            style={{
            width: '100%',
            }}
            size={[0, 48]}
        >
            <Layout>
                <Header style={headerStyle}>Nospoon</Header>
                <Content style={contentStyle}>
                    <Space direction="vertical" size={[0,48]}>
                        {/* <Header>Titel</Header>
                        <Content>Search Condition</Content>
                        <Footer>List</Footer> */}
                        <div>
                            <Row>
                                <Col span={12} textAligan="left"> 온라인로그...</Col>
                                <Col span={12}>
                                    <Button
                                        type="primary"
                                        onClick={onClickSearch}
                                        // disabled={!hasSelected}
                                        // loading={loading}
                                        >
                                        조회
                                    </Button>
                                    <Button 
                                        type="primary"
                                        onClick={onClickToggle}
                                        // title={isOff ? 'OFF' : 'ON'}
                                        >
                                          {isOff ? '확대' : '축소'}
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                        <div hidden={isOff}>
                            <Row>
                                <Col span={3}>거래일자:</Col>
                                <Col span={9}>
                                    <RangePicker
                                        showTime={{
                                            format: 'HH:mm',
                                        }}
                                        format="YYYY-MM-DD HH:mm"
                                        onChange={onChange}
                                        onOk={onOk}
                                        />
                                </Col>
                                <Col span={2}>GID</Col>
                                <Col span={10}>
                                    <Input
                                        placeholder="GID"
                                        value={gid}
                                        // disabled="falue"
                                        onChange={onChangeGID}
                                    />
                                </Col>
                                <Col span={2}>Proc_Sts</Col>
                                <Col span={2}>
                                    <Input
                                        placeholder="PROC_STS"
                                        value={proc_sts}
                                        // disabled={isOff}
                                        // hidden={isOff}
                                        onChange={onChangeProcSts}
                                    />
                                </Col>
                                <Col span={3}>Count/Took</Col>
                                <Col span={5}>{resultcount} / {resulttook}</Col>
                            </Row>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                        </div>
                        <div>
                        <Table
                            loading={loading}
                            // rowSelection={rowSelection}
                            rowKey={"id"}
                            // rowKey={(record) => record.login.uuid}
                            columns={columns}
                            dataSource={dataSource}
                            pagination={pagination}
                            onChange={handleTableChange}
                        ></Table>
                        </div>
                    </Space>
                </Content>
                <Footer style={footerStyle}>Written by mjkim</Footer>
            </Layout>
        </Space>
    </>
  );
}