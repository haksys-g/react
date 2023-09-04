import { Button, Col, DatePicker, Input, Layout, Row, Space, Table, Select } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Nospoon() {
    // const [status, setStatus] = useState("dklee");

    // table handling variables
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10});
    const [sort, setSort] = useState('cruzlink.TRN_GID.keyword');
    const [filter, setFilter] = useState('');

    const [resultcount, setResultCount] = useState(0);
    const [resulttook, setResultTook] = useState(0);

    const [resultstart, setResultStart] = useState(0);
    const [resultend, setResultEnd] = useState(0);

    // data handling variables
    const [gid, setGid] = useState("");
    const [proc_sts, setProcSts] = useState("");
    const [proc_sts2, setProcSts2] = useState("");
    const [proc_node, setProcNode] = useState("");
    const [if_id, setIfId] = useState("");
    const [if_ptrn, setIfPtrn] = useState("");

    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");

    const [isOff, setIsOff] = useState(true);

    // etc
    const mounted = useRef(false);
    const [count, setCount] = useState(0);

    const columns = [
        {
        title: "GID",
        dataIndex: "TRN_GID",
        width: "20%",
        align: "left",
        sorter: (a, b) => a.gid - b.gid,
        //   sortDirections: ["descend"],
        },
        {
        title: "대표거래SEQ",
        dataIndex: "TRN_MST_SEQ",
        width: "20%"
        },
        {
        title: "처리상태",
        dataIndex: "PROC_STS",
        width: "20%"
        },
        {
        title: "노드 정보",
        dataIndex: "PROC_NODE",
        width: "20%"
        },
        {
        title: "인터페이스ID",
        dataIndex: "IF_ID",
        width: "20%"
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
        backgroundColor: "#000",
    };
    const contentStyle = {
        textAlign: "center",
        minHeight: 120,
        // 수정됨
        lineHeight: "50px",
        color: "#fff",
        backgroundColor: "#909090",
    };
    // 수정됨
    const fieldStyle = {
        color: "#fff",
        backgroundColor: "#000",
    };
    const valueStyle = {
        color: "#fff",
        backgroundColor: "#777",
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
            // 수정됨
            proc_sts2: proc_sts2,
            proc_node: proc_node,
            if_id: if_id,
            if_ptrn: if_ptrn,
            params: params,
            start_date: start_date,
            end_date: end_date,
        }
        }).then((response) => {
        console.log(response);
        setResultCount(response.data.data.count);
        setResultTook(response.data.data.took);
        setResultStart(response.data.data.start_date);
        setResultEnd(response.data.data.end_date);
        console.log("starttest:", response.data.data.start_date);

        const fileData = response.data.response.hits.hits.map((item) => {
            return {
            TRN_GID: item._source.cruzlink.TRN_GID,
            TRN_MST_SEQ: item._source.cruzlink.TRN_MST_SEQ,
            PROC_STS: item._source.cruzlink.PROC_STS,
            PROC_NODE: item._source.cruzlink.PROC_NODE,
            IF_ID: item._source.cruzlink.IF_ID,
            IF_PTRN: item._source.cruzlink.IF_PTRN,
            };
        });
        setDataSource(fileData);
        // setSearchResultCount(response.data.count);
        setPagination({
            ...params.pagination,
            total: response.data.data.count,
        });
        setLoading(false);
        });
    };

    const onChange = (value, dateString) => {
        // console.log("Selected Time: ", value);
        // console.log("Formatted Selected Time: ", dateString);
        // console.log("test1", dateString[0], dateString[1]);
        setStartDate(dateString[0]);
        setEndDate(dateString[1]);
    };
    const onOk = (value) => {
        console.log("onOk: ", value);
    };

    function onChangeGID(e) {
        setGid(e.target.value);
        // console.log(e.target.value);
    }

    function onChangeProcSTS(e) {
        setProcSts(e.target.value);
        // console.log(e.target.value);
        // console.log(`selected! ${e.target.value}`);
    }

    function onClickSearch() {
        // console.log(gid);
        setCount(count + 1);
        setPagination({ current: 1, pageSize: 10 });
    }
    function onClickToggle(){
        console.log('Toggle....', isOff);
        setIsOff(!isOff);
        // isOff ? 'ON' : 'OFF';
    };
    const handleTableChange = (pagination, filter, sorter) => {
        // console.log('pagination', pagination);
        // console.log('filters', filters);
        // console.log('sorter', sorter);

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

    const onChangeProcSTS2 = (e) => {
        setProcSts2(e);
        // console.log(`selected? ${e}`);
    };

    const onSearch = (e) => {
        console.log('search:', e);
    };

    const onChangeProcNode = (e) => {
        setProcNode(e);
        // console.log(`selected ${e}`);
    };

    const onChangeIfId = (e) => {
        setIfId(e);
        // console.log(`selected ${e}`);
    };

    const onChangeIfPtrn = (e) => {
        setIfPtrn(e);
        // console.log(`selected ${e}`);
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
                    // 수정됨
                    style={{ width: "90%", rowGap: 10}}
                >
                <div>
                    <Row>
                    <Col span={12} style={{textAlign : "left"}}>
                        온라인 로그(Opensearch)
                    </Col>
                    <Col span={12} style={{textAlign : "right"}}>
                        <Space>
                        <Button type="primary" onClick={onClickSearch}>
                            조회
                        </Button>
                        <Button type="primary" onClick={onClickToggle}>{isOff ? '확대' : '축소'}</Button>
                        </Space>
                    </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col span={12}>
                            <Row>
                            <Col span={6} style={fieldStyle}>거래일자</Col>
                            <Col span={18} style={valueStyle}>
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
                            <Row>
                                <Col span={12}>
                                    {/* 수정 */}
                                    <Row>
                                    <Col span={12} style={fieldStyle}>채널정보</Col>
                                    <Col span={12} style={valueStyle}>
                                        <Input
                                            placeholder="PROC_STS"
                                            value={proc_sts}
                                            onChange={onChangeProcSTS}
                                        />
                                    </Col>
                                    </Row>
                                    {/* 수정 */}
                                 <div hidden={isOff}>
                                    <Row>
                                    <Col span={12} style={fieldStyle}>대표거래SEQ</Col>
                                    <Col span={12} style={valueStyle}>
                                        <Input
                                        placeholder="PROC_STS"
                                        value={proc_sts}
                                        onChange={onChangeProcSTS}
                                        />
                                    </Col>
                                    </Row>
                                    {/* 수정 */}
                                    <Row>
                                    <Col span={12} style={fieldStyle}>소요시간(sec)</Col>
                                    <Col span={12} style={valueStyle}>
                                        <Input
                                        placeholder="PROC_STS"
                                        value={proc_sts}
                                        onChange={onChangeProcSTS}
                                        />
                                    </Col>
                                    </Row>
                                    {/* 수정 */}
                                    <Row>
                                    <Col span={12} style={fieldStyle}>필터1</Col>
                                    <Col span={12} style={valueStyle}>
                                        <Input
                                        placeholder="PROC_STS"
                                        value={proc_sts}
                                        onChange={onChangeProcSTS}
                                        />
                                    </Col>
                                    </Row>
                                 </div>
                                    {/* 수정 */}
                                    <Row>
                                    <Col span={12} style={fieldStyle}>필터5</Col>
                                    <Col span={12} style={valueStyle}>
                                        <Input
                                        placeholder="PROC_STS"
                                        value={proc_sts}
                                        onChange={onChangeProcSTS}
                                        />
                                    </Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    {/* 수정 */}
                                    <Row>
                                    <Col span={12} style={fieldStyle}>연계유형</Col>
                                    <Col span={12} style={valueStyle}>
                                    <Select
                                        showSearch
                                        placeholder="Select a IF_PTRN"
                                        optionFilterProp="IF_PTRN"
                                        onChange={onChangeIfPtrn}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        allowClear
                                        options={[
                                            {
                                            value: "T2T",
                                            label: "T2T",
                                            },
                                        ]}
                                    />  
                                    </Col>
                                    </Row>
                                    {/* 수정 */}
                                    <Row>
                                    <Col span={12} style={fieldStyle}>노드정보</Col>
                                    <Col span={12} style={valueStyle}>
                                    <Select
                                        showSearch
                                        placeholder="Select a PROC_NODE"
                                        optionFilterProp="PROC_NODE"
                                        onChange={onChangeProcNode}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        allowClear
                                        options={[
                                            {
                                            value: "0101",
                                            label: "0101",
                                            },
                                        ]}
                                    />  
                                    </Col>
                                    </Row>
                                    {/* 수정 */}
                                 <div hidden={isOff}>
                                    <Row>
                                    <Col span={12} style={fieldStyle}>데이터크기(byte)</Col>
                                    <Col span={12} style={valueStyle}>
                                        <Input
                                        placeholder="PROC_STS"
                                        value={proc_sts}
                                        onChange={onChangeProcSTS}
                                        />
                                    </Col>
                                    </Row>
                                    {/* 수정 */}
                                    <Row>
                                    <Col span={12} style={fieldStyle}>필터2</Col>
                                    <Col span={12} style={valueStyle}>
                                        <Input
                                        placeholder="PROC_STS"
                                        value={proc_sts}
                                        onChange={onChangeProcSTS}
                                        />
                                    </Col>
                                    </Row>
                                    {/* 수정 */}
                                    <Row>
                                    <Col span={12} style={fieldStyle}>필터6</Col>
                                    <Col span={12} style={valueStyle}>
                                        <Input
                                        placeholder="PROC_STS"
                                        value={proc_sts}
                                        onChange={onChangeProcSTS}
                                        />
                                    </Col>
                                    </Row>
                                    </div>
                                </Col>
                            </Row>
                            
                        </Col>
                        <Col span={6}>
                            <Row>
                                <Col span={12} style={fieldStyle}>GID</Col>
                                <Col span={12} style={valueStyle}>
                                    <Input
                                    placeholder="GID"
                                    value={gid}
                                    onChange={onChangeGID}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={fieldStyle}>인터페이스정보</Col>
                                <Col span={12} style={valueStyle}>
                                <Select
                                        showSearch
                                        placeholder="인터페이스ID/명 검색"
                                        optionFilterProp="IF_ID"
                                        onChange={onChangeIfId}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        allowClear
                                        options={[
                                            { value: "", label: "", },
                                            { value: "CPM_ONL_00", label: "CPM_ONL_00", },
                                            { value: "CPM_ONL_01", label: "CPM_ONL_01", },
                                            { value: "CPM_ONL_02", label: "CPM_ONL_02", },
                                            { value: "CPM_ONL_03", label: "CPM_ONL_03", },
                                            { value: "CPM_ONL_04", label: "CPM_ONL_04", },
                                            { value: "CPM_ONL_05", label: "CPM_ONL_05", },
                                            { value: "CPM_ONL_06", label: "CPM_ONL_06", },
                                            { value: "CPM_ONL_07", label: "CPM_ONL_07", },
                                            { value: "CPM_ONL_08", label: "CPM_ONL_08", },
                                            { value: "CPM_ONL_09", label: "CPM_ONL_09", },
                                            { value: "CPM_ONL_10", label: "CPM_ONL_10", },
                                            { value: "CPM_ONL_11", label: "CPM_ONL_11", },
                                            { value: "CPM_ONL_12", label: "CPM_ONL_12", },
                                            { value: "CPM_ONL_13", label: "CPM_ONL_13", },
                                            { value: "CPM_ONL_14", label: "CPM_ONL_14", },
                                            { value: "CPM_ONL_15", label: "CPM_ONL_15", },
                                            { value: "CPM_ONL_16", label: "CPM_ONL_16", },
                                            { value: "CPM_ONL_17", label: "CPM_ONL_17", },
                                            { value: "CPM_ONL_18", label: "CPM_ONL_18", },
                                            { value: "CPM_ONL_19", label: "CPM_ONL_19", },
                                        ]}
                                    />  
                                </Col>
                            </Row>
                            {/* 수정 */}
                            <Row>
                                <Col span={12} style={fieldStyle}>실행 유형</Col>
                                <Col span={12} style={valueStyle}>
                                    <Input
                                    placeholder="PROC_STS"
                                    value={proc_sts}
                                    onChange={onChangeProcSTS}
                                    />
                                </Col>
                            </Row>
                            {/* 수정 */}

                                 <div hidden={isOff}>
                            <Row>
                                <Col span={12} style={fieldStyle}>백엔드 서버 코드</Col>
                                <Col span={12} style={valueStyle}>
                                    <Input
                                    placeholder="PROC_STS"
                                    value={proc_sts}
                                    onChange={onChangeProcSTS}
                                    />
                                </Col>
                            </Row>
                            {/* 수정 */}
                            <Row>
                                <Col span={12} style={fieldStyle}>필터 3</Col>
                                <Col span={12} style={valueStyle}>
                                    <Input
                                    placeholder="PROC_STS"
                                    value={proc_sts}
                                    onChange={onChangeProcSTS}
                                    />
                                </Col>
                            </Row>
                            {/* 수정 */}
                            <Row>
                                <Col span={12}></Col>
                                <Col span={12}>
                                    <Input
                                    placeholder="PROC_STS"
                                    value={proc_sts}
                                    onChange={onChangeProcSTS}
                                    />
                                </Col>
                            </Row>
                            </div>
                        </Col>
                        <Col span={6}>
                            {/* 수정 */}
                            <Row>
                                <Col span={12} style={fieldStyle}>처리 상태</Col>
                                <Col span={12} style={valueStyle}>
                                <Select
                                    showSearch
                                    placeholder="Select a PROC_STS"
                                    optionFilterProp="PROC_STS"
                                    onChange={onChangeProcSTS2}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    allowClear
                                    options={[
                                        { value: 'OK', label: 'OK', },
                                        { value: 'ING', label: 'ING', },
                                        { value: 1901, label: 1901, },
                                        { value: 1807, label: 1807, },
                                        { value: 1801, label: 1801, },
                                        { value: 1809, label: 1809, },
                                        { value: 1006, label: 1006, },
                                        { value: 5003, label: 5003, },
                                    ]}
                                />
                                </Col>
                            </Row>
                            {/* 수정 */}
                            <Row>
                                <Col span={12} style={fieldStyle}>거래일련번호</Col>
                                <Col span={12} style={valueStyle}>
                                    <Input
                                    placeholder="PROC_STS"
                                    value={proc_sts}
                                    onChange={onChangeProcSTS}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={fieldStyle}>거래방향</Col>
                                <Col span={12} style={valueStyle}>
                                    <Input
                                    placeholder="PROC_STS"
                                    value={proc_sts}
                                    onChange={onChangeProcSTS}
                                    />
                                </Col>
                            </Row>

                                 <div hidden={isOff}>
                            <Row>
                                <Col span={12} style={fieldStyle}>에러상세내역</Col>
                                <Col span={12} style={valueStyle}>
                                    <Input
                                    placeholder="PROC_STS"
                                    value={proc_sts}
                                    onChange={onChangeProcSTS}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={fieldStyle}>필터4</Col>
                                <Col span={12} style={valueStyle}>
                                    <Input
                                    placeholder="PROC_STS"
                                    value={proc_sts}
                                    onChange={onChangeProcSTS}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}></Col>
                                <Col span={12}>
                                    <Input
                                    placeholder="PROC_STS"
                                    value={proc_sts}
                                    onChange={onChangeProcSTS}
                                    />
                                </Col>
                            </Row>
                            </div>
                        </Col>
                    </Row>
                    
                    {/* <Row>2</Row>
                    <Row>3</Row>
                    <Row>4</Row>
                    <Row>5</Row>
                    <Row>6</Row> */}
                    </div>
                    <div style={{textAlign : "left"}}>
                        Count: {resultcount}, Took: {resulttook}, Start: {resultstart}, End: {resultend},
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
            <Footer style={footerStyle}>Written by MJKim</Footer>
        </Layout>
        </Space>
    </>
    );
}