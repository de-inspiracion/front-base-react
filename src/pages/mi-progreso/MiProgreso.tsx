import { Card, Col, Layout, Row, Typography } from "antd"
import { StarFilled, TrophyFilled } from '@ant-design/icons';

const { Content } = Layout
const { Title, Paragraph, Text } = Typography

const gridStyle: React.CSSProperties = {
    minWidth: '160px',
    textAlign: 'center',
    height: '100px',
};

const numberStadistic: React.CSSProperties = {
    minWidth: '160px',
    textAlign: 'center',
    fontSize: '40px',
    height: '100px',
}

const MiProgreso = () => {
    return (
        <Layout style={{ padding: '30px 30px', background: 'black' }}>
            <Content>

                <Text style={{ fontSize: '18px', color: 'white' }} strong>Bienvenido:</Text><Text style={{ fontSize: '18px' }} type="secondary"> TOMÁS DESPOUY ZULUETA</Text>

            </Content>
            <Content>
                <Title style={{ color: 'white' }}>Resumen</Title>
                <Row gutter={8}>
                    <Col span={12}>
                        <Card>
                            <Card.Grid hoverable={false} style={numberStadistic}><TrophyFilled /></Card.Grid>
                            <Card.Grid hoverable={false} style={gridStyle}>
                                <Paragraph>
                                    <Typography>Categoria:</Typography>
                                    <Typography.Title level={4} style={{ margin: 0 }}>
                                        SILVER
                                    </Typography.Title>
                                </Paragraph>
                            </Card.Grid>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Card.Grid hoverable={false} style={{ textAlign: 'center', fontSize: '40px', height: '100px', minWidth: '160px' }}>
                                <StarFilled style={{ color: '#ecc538' }} />
                            </Card.Grid>
                            <Card.Grid hoverable={false} style={{ textAlign: 'center', fontSize: '40px', height: '100px', minWidth: '160px' }}>25</Card.Grid>
                            <Card.Grid hoverable={false} style={{ textAlign: 'center', height: '100px', minWidth: '160px' }}>Estrellas virgo para canjear</Card.Grid>
                        </Card>
                    </Col>
                </Row>
            </Content>
            <Content >
                <Title style={{ color: 'white' }}>Mi aprendizaje</Title>
                <Row gutter={8}>
                    <Col span={12}>
                        <Card>
                            <Card.Grid hoverable={false} style={numberStadistic}>25</Card.Grid>
                            <Card.Grid hoverable={false} style={gridStyle}>Total de horas de estudio</Card.Grid>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Card.Grid hoverable={false} style={numberStadistic}>8</Card.Grid>
                            <Card.Grid hoverable={false} style={gridStyle}>Horas de Estudio del último mes</Card.Grid>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={12}>
                        <Card style={{ marginTop: 16 }}>
                            <Card.Grid hoverable={false} style={numberStadistic}>25</Card.Grid>
                            <Card.Grid hoverable={false} style={gridStyle}>Cursos Completados</Card.Grid>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card style={{ marginTop: 16 }}>
                            <Card.Grid hoverable={false} style={numberStadistic}>5</Card.Grid>
                            <Card.Grid hoverable={false} style={gridStyle}>Rutas de aprendizaje</Card.Grid>
                        </Card>
                    </Col>
                </Row>
            </Content>
            <Content>
                <Title style={{ color: 'white' }}>Mis Cursos</Title>
            </Content>
        </Layout>
    )
}

export default MiProgreso