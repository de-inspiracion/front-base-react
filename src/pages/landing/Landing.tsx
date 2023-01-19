import { useAuth0 } from "@auth0/auth0-react"
import { Button, Layout, Typography } from "antd"
import imgBackground from "../../assets/peliculas-banner.png"

// const App = () => (
const Landing = () => {

    const { loginWithRedirect } = useAuth0()
    const { Header, Content } = Layout
    const { Paragraph } = Typography;
    return (
        <>
            <Layout
                style={{
                    background: `url(${imgBackground}) no-repeat center / cover`,
                    height: '100vh',
                }}>
                <Header style={{ position: "relative", top: 0, zIndex: 1, width: "100%", padding: 5, background: 'transparent' }}>
                    <div
                        style={{
                            color: '#fff',
                            fontWeight: '900',
                            paddingLeft: '15px',
                            fontSize: '20px',
                        }}
                    >
                        VIRGO
                    </div>
                </Header>
                <Content
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Paragraph>
                        <Typography.Title level={1} style={{ margin: 0, color: 'white', textAlign: 'center' }}>
                            Unlimited Movies, TV
                        </Typography.Title>
                        <Typography.Title level={1} style={{ margin: 0, color: 'white', textAlign: 'center' }}>
                            Shows and more.
                        </Typography.Title>
                    </Paragraph>
                    <Paragraph style={{ color: 'white', textAlign: 'center', fontSize: '20px' }}>Whatch anywhere, Cancel anytime</Paragraph>

                    <Paragraph style={{ color: 'white', textAlign: 'center' }}>Ready to Watch? Enter your email to create or restart your membership.
                    </Paragraph>


                    <Button
                        type="primary"
                        onClick={() => loginWithRedirect()}>
                        Iniciar Sesión
                    </Button>
                </Content>
            </Layout>
        </>
    )
}

export default Landing

