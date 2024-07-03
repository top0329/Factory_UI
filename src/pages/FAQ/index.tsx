import { useEffect } from 'react';
import AOS from 'aos';

import FAQ from '../../components/FAQ';

function FAQPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  return <FAQ />;
}

export default FAQPage;
