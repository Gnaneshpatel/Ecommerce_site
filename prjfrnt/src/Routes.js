import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../src/core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminDashBoard from './user/AdminDashBoard';
import UserDashBoard from './user/UserDashBoard';
import Profile from './user/Profile';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import AdminRoutes from './auth/helper/AdminRoutes';
import AddCategory from './admin/AddCategory';
import manageCategories from './admin/manageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './components/Cart';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <PrivateRoutes path='/cart' exact component={Cart} />
        <Route path='/Signup' exact component={Signup} />
        <Route path='/Signin' exact component={Signin} />
        <PrivateRoutes path='/user/dashbord' exact component={UserDashBoard} />
        <AdminRoutes path='/admin/dashbord' exact component={AdminDashBoard} />
        <AdminRoutes path='/create/category' exact component={AddCategory} />
        <AdminRoutes path='/manage/category' exact component={manageCategories} />
        <AdminRoutes path='/create/product' exact component={AddProduct} />
        <AdminRoutes path='/manage/product' exact component={ManageProducts} />
        <AdminRoutes path='/updata/product/:productId' exact component={UpdateProduct} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
