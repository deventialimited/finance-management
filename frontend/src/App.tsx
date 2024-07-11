import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard/Dashboard';
import Expenses from './pages/Expenses/Expenses';
import Revenues from './pages/Revenues/Revenues';
import Savings from './pages/Savings/Savings';
import TotalNetworth from './pages/TotalNetworth/TotalNetworth';
import Notifications from './pages/Notifications/Notification';
import Profile from './pages/Profile/Profile';
import Debts from "./pages/Debts/Debts"
import AddDebts from './pages/AddDebts/AddDebts';
import {useBackendDataStore} from "./Store Management/useBackendDataStore"
import {getAllTransactions,getAllBills,getAllExpenses} from "./libs/getApis"
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
 const {updateAllBills,updateAllExpenses,updateAllTransactions}=useBackendDataStore()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedTransactions = await getAllTransactions();
      console.log(fetchedTransactions)
      updateAllTransactions(fetchedTransactions || []);

      const fetchedBills = await getAllBills();
      console.log(fetchedBills)
      updateAllBills(fetchedBills || []);

      const fetchedExpenses = await getAllExpenses();
      console.log(fetchedExpenses)
      updateAllExpenses(fetchedExpenses || []);
    };
    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {/* Main Dashboard Start */}
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Finance | Dashboard" />
              <Dashboard />
            </>
          }
        />
        {/* Dashboard End */}
        {/* Expenses  */}
        <Route
          path="/expenses"
          element={
            <>
              <PageTitle title="Finacne | Expenses" />
              <Expenses />
            </>
          }
        />
        {/* Reveneus  */}
        <Route
          path="/revenues"
          element={
            <>
              <PageTitle title="Finance | Revenues" />
              <Revenues />
            </>
          }
        />
        {/* Debts */}
        <Route
          path="/debts"
          element={
            <>
              <PageTitle title="Finance | Debts" />
              <Debts />
            </>
          }
        />
        {/* Savings */}
        <Route
          path="/savings"
          element={
            <>
              <PageTitle title="Finance | Savings" />
              <Savings />
            </>
          }
        />
        {/* Profile */}
        <Route
          path="/total_net_worth"
          element={
            <>
              <PageTitle title="Finance | Total Net Worth" />
              <TotalNetworth />
            </>
          }
        />
        <Route
          path="/notifications"
          element={
            <>
              <PageTitle title="Finance | Notifications" />
              <Notifications />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Finance | Profile" />
              <Profile />
            </>
          }
        />
        <Route
          path="/add-debts"
          element={
            <>
              <PageTitle title="Finance | Add Debts" />
              <AddDebts />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
