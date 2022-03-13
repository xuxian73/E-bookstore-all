import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {history} from "./util/history";
import BookView from './view/BookView'
import OrderView from './view/OrderView'
import CartView from './view/CartView'
import UserManage from './view/UserManage'
import BookManage from './view/BookManage'
import OrderManage from './view/OrderManage'
import DetailView from './view/DetailView'
import LoginView from './view/LoginView'
import RegisterView from './view/RegisterView'
import ProfileView from './view/ProfileView'
import AnalysisView from "./view/AnalysisView";
import LoginRoute from './LoginRoute'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'

class BasicRoute extends React.Component {

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location, action);
        });
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <LoginRoute exact path="/login" component={LoginView}/>
                    <Route exact path="/register" component={RegisterView}/>
                    <PrivateRoute exact path="/" component={BookView}/>
                    <PrivateRoute exact path="/order" component={OrderView}/>
                    <PrivateRoute exact path="/cart" component={CartView}/>
                    <PrivateRoute exact path="/detail" component={DetailView}/>
                    <PrivateRoute exact path="/profile" component={ProfileView}/>
                    <AdminRoute exact path="/usermanage" component={UserManage}/>
                    <AdminRoute exact path="/bookmanage" component={BookManage}/>
                    <AdminRoute exact path="/ordermanage" component={OrderManage}/>
                    <AdminRoute export path='/analysis' component={AnalysisView}/>
                    <Redirect from="/*" to="/login" />
                </Switch>

            </Router>
        )
    }


}

export default BasicRoute;