import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import OrderDetail from './components/OrderDetail';

const App = () => {
  return (
    <Router>
      <div class="container pt-5">
        <Switch>
          <Route path="/" exact>
            <OrderList />
          </Route>
          <Route path="/detail/:id" exact>
            <OrderDetail />
          </Route>
          <Route path="/create" exact>
            <OrderForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
