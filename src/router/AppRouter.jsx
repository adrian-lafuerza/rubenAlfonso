import App from '../App';
import { MailchimpProvider } from '../contexts/MailchimpContext';

const AppRouter = () => {
  return (
    <MailchimpProvider>
      <App />
    </MailchimpProvider>
  );
};

export default AppRouter;