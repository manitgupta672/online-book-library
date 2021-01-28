import './App.css';
import { Layout } from 'antd';
import ListBooks from './modules/Books/ListContainer';
import { Provider } from 'react-redux'
import store from './redux/store';

const { Header, Content, Footer } = Layout;


function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" ><p>Groupon</p></div>
          
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ margin: '16px 0' }}>
          
          </div>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <ListBooks />
          </div>
        </Content>
      </Layout>
    </Provider>
  );
}

export default App;

