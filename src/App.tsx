import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import AddressBook from './pages/AddressBook';
import Auth from './pages/Auth';
import BindEmail from './pages/BindEmail';
import Settings from './pages/Settings';
import Invite from './pages/Invite';
import InviteRecord from './pages/InviteRecord';
import CommissionDetails from './pages/CommissionDetails';
import CustomerService from './pages/CustomerService';
import Messages from './pages/Messages';
import Feedback from './pages/Feedback';
import Welfare from './pages/Welfare';
import InviteSteps from './pages/InviteSteps';
import HelpPay from './pages/HelpPay';
import ApplyProxyPay from './pages/ApplyProxyPay';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="address" element={<AddressBook />} />
          <Route path="auth" element={<Auth />} />
          <Route path="email" element={<BindEmail />} />
          <Route path="settings" element={<Settings />} />
          <Route path="invite" element={<Invite />} />
          <Route path="invite-record" element={<InviteRecord />} />
          <Route path="commission" element={<CommissionDetails />} />
          <Route path="customer-service" element={<CustomerService />} />
          <Route path="messages" element={<Messages />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="welfare" element={<Welfare />} />
          <Route path="invite-steps" element={<InviteSteps />} />
          <Route path="help-pay" element={<HelpPay />} />
          <Route path="apply-proxy-pay" element={<ApplyProxyPay />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
