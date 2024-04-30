import { HeadProvider } from 'react-head';
import Image404 from '../../assets/images/bg_404_text.png';
import { Helmet } from 'react-helmet';

export default function PageNotFoundPage() {
  return (
    <HeadProvider>
      <Helmet>
        <link rel="preload" as="image" href={Image404} />
      </Helmet>
      <div className="min-w-[320px] bg-contain bg-no-repeat bg-center">
        <img src={Image404} alt="404 image"></img>
      </div>
    </HeadProvider>
  );
}
