import { Button, Col, DatePicker, Input, Layout, Row, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Nospoon() {
  const [status, setStatus] = useState("dklee");
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagenation] = useState({ current: 1, pageSize: 10 });

  const [sort, setSort] = useState('cruzlink.TRN_GID.keyword');
  const [filter, setFilter] = useState('');

  const [resultcount, setResultCount] = useState(0);
  const [resulttook, setResultTook] = useState(0);

  // const [sort_query, setSortQuery] = useState("");
  // const [filter_query, setFilterQuery] = useState("");

  const [gid, setGid] = useState("");
  const [proc_sts, setProcSts] = useState("");

  const mounted = useRef(false);
  const [count, setCount] = useState(0);

  const columns = [
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

  const { Header, Footer, Content } = Layout;
  const { RangePicker } = DatePicker;
  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "#7dbcea",
  };

  const contentStyle = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#108ee9",
  };

  const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#7dbcea",
  };

  useEffect(() => {
    console.log('start loading...');
  }, []);

  useEffect(() => {
    console.log("count loading...", count);
    if (!mounted.current) {
      mounted.current = true;
    } else  {
      fetch({ pagination, filter, sort });
    }
  }, [count]);

  const fetch = (params = {}) => {
    setLoading(true);
    console.log(params);
    console.log(getRandomuserParams(params));
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
      }
    }).then((response) => {
      console.log(response);
      setResultCount(response.data.data.count);
      setResultTook(response.data.data.took);
      const fileData = response.data.response.hits.hits.map((item) => {
        return{
            TRN_GID: item._source.cruzlink.TRN_GID,
            TRN_MST_SEQ: item._source.cruzlink.TRN_MST_SEQ,
        
      };
    });
      // setDataSource(response.data.hits.hits);
      // setSearchResultCount(response.data.count);
      setPagenation({
        ...params.pagination,
        total: response.data.data.count,
      });
      setDataSource(fileData);
      setLoading(false);
    });
  };

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
  };
  function onChangeGID(e) {
    setGid(e.target.value);
    console.log(e.target.value);
  }

  function onChangeProcSts(e) {
    setProcSts(e.target.value);
    console.log(e.target.value);
  }

  function onClickSearch() {
    console.log(gid);
    setCount(count + 1);
    // axios({
    //   url: "http://1.234.25.132:40503/api/grammars/master/",
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: {
    //     gid: gid,
    //   }
    // }).then((response) => {
    //   console.log(response.data.hits.hits);
    //   // setStatus(response.data.status);
    // });
  }

  const handleTableChange = (pagination, filters, sorter) => {
    // console.log(pagination);
    // console.log(filters);
    // console.log(sorter);

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
    // console.log(filters_query);
    // const filters_query =
    //   filters_dict_type +
    //   filters_type +
    //   filters_category +
    //   filters_pos +
    //   filters_status;

    // setFilterQuery("");
    // console.log(filters_query);

    setFilter('');
    setSort( sorter.field ? sorter.order === "descend" ? "-cruzlink." + sorter.field + ".keyword" : "cruzlink." + sorter.field + ".keyword": "cruzlink.TRN_GID.keyword");

    console.log(pagination);
    console.log(filter);
    console.log(sorter);

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
          width: "100%",
        }}
        size={[0, 48]}
      >
        <Layout>
          <Header style={headerStyle}>Nospoon</Header>
          <Content style={contentStyle}>
            <Space
              direction="vertical"
              size={[0, 48]}
              style={{ width: "100%" }}
            >
              <div>
                <Row>
                  <Col span={12} textAlign="right">
                    온라인 로그(Opensearch)
                  </Col>
                  <Col span={12} textAlign="right">
                    <Space>
                      <Button type="primary" onClick={onClickSearch}>
                        조회
                      </Button>
                      <Button type="primary">축소/확장</Button>
                    </Space>
                  </Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col span={12}>
                    <Row>
                      <Col span={8}>거래일자 :</Col>
                      <Col span={16}>
                        <RangePicker
                          showTime={{
                            format: "HH:mm",
                          }}
                          format="YYYY-MM-DD HH:mm"
                          onChange={onChange}
                          onOk={onOk}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Row>
                      <Col span={12}>GID :</Col>
                      <Col span={12}>
                        <Input
                          placeholder="GID"
                          value={gid}
                          onChange={onChangeGID}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>PROC_STS :</Col>
                      <Col span={12}>
                        <Input
                          placeholder="PROC_STS"
                          value={proc_sts}
                          onChange={onChangeProcSts}
                        />
                      </Col>
                      <Col span={12}>Count/Took</Col>
                      <Col span={12}>{resultcount} / {resulttook}</Col>
                    </Row>
                  </Col>
                  <Col span={6}></Col>
                </Row>
                {/* <Row>2</Row>
                <Row>3</Row>
                <Row>4</Row>
                <Row>5</Row>
                <Row>6</Row> */}
              </div>
              <div>
                <Table
                  loading={loading}
                  // rowSelection={rowSelection}
                  rowKey={"id"}
                  columns={columns}
                  dataSource={dataSource}
                  pagination={pagination}
                  onChange={handleTableChange}
                ></Table>
              </div>
            </Space>
          </Content>
          <Footer style={footerStyle}>Written by Dongkil Lee</Footer>
        </Layout>
      </Space>
    </>
  );
}

