import { useState } from 'react';
import Button from '../../components/Button';
import emailJs from '@emailjs/browser';
import { Helmet } from 'react-helmet';

export default function ContactUs() {
  const initalState = {
    name: '',
    email: '',
    number: '',
    message: '',
  };
  const [form, setForm] = useState(initalState);

  const handleInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    const { name, email, number, message } = form;
    if (name && email && number && message) {
      if (!validateNumber(number)) {
        alert('Invalid Phone number.');
        return;
      }
      if (validateEmail(email)) {
        emailJs
          .send(
            'service_q3nio78',
            'template_kw86h2m',
            {
              from_name: form.name,
              from_email: form.email,
              message: form.message,
              number: form.number,
            },
            'M6jnU3EEYwoZrQ-zE'
          )
          .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert('Invalid Email address');
      }
    }
    alert('Will send');
  };

  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateNumber(num: string) {
    const numString: string = num.toString();
    let count = 0;
    for (let i = 0; i < numString.length; i++) {
      if (isNaN(Number(numString[i]))) {
        return false;
      } else {
        count++;
      }
    }

    if (count >= 10) {
      return true;
    }
    return false;
  }

  return (
    <div className="p-24">
      <Helmet>
        <meta
          name="description"
          content="This is Factory1155.com. Here you can get the unique 'Product Token' which is combined of 'blueprint token' and component tokens - ERC20, ERC721 and ERC1155 tokens. You can contact us with this page."
        />
        <meta
          name="keyword"
          content="Factory, Factory1155, Blueprint, Product, Custody, Component Token, Combine, Synthesis, Decompose"
        />
        <meta property="og:title" content="Factory/Contact" />
        <meta
          property="og:description"
          content="This is Factory1155.com. Here you can get the unique 'Product Token' which is combined of 'blueprint token' and component tokens - ERC20, ERC721 and ERC1155 tokens. You can contact us with this page."
        />

        <meta
          name="description"
          content="This is Factory1155.com. Here you can get the unique 'Product Token' which is combined of 'blueprint token' and component tokens - ERC20, ERC721 and ERC1155 tokens. You can contact us with this page."
        />
        <meta
          name="keyword"
          content="Factory, Factory1155, Blueprint, Product, Custody, Component Token, Combine, Synthesis, Decompose"
        />
        <meta property="og:title" content="Factory" />
        <meta
          property="og:description"
          content="This is Factory1155.com. Here you can get the unique 'Product Token' which is combined of 'blueprint token' and component tokens - ERC20, ERC721 and ERC1155 tokens."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://factory1155.com/" />
        <meta property="twitter:title" content="Factory1155" />
        <meta
          property="twitter:description"
          content="This is Factory1155.com. Here you can get the unique 'Product Token' which is combined of 'blueprint token' and component tokens - ERC20, ERC721 and ERC1155 tokens"
        />
      </Helmet>
      <p className="text-white font-black text-6xl">Contact Us</p>
      <form className="flex flex-col gap-y-7 py-8">
        <div className="flex flex-col gap-y-2">
          <p className="text-lg text-[#858584]">Name:</p>
          <input
            name="name"
            className="text-white border-[0.5px] w-full py-1 px-4 rounded-md text-3xl bg-[#010B10] border-secondary"
            maxLength={20}
            value={form.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-lg text-[#858584]">Email:</p>
          <input
            name="email"
            className="text-white border-[0.5px] w-full py-1 px-4 rounded-md text-3xl bg-[#010B10] border-secondary"
            maxLength={30}
            value={form.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-lg text-[#858584]">Phone Number:</p>
          <input
            name="number"
            className="text-white border-[0.5px] w-full py-1 px-4 rounded-md text-3xl bg-[#010B10] border-secondary"
            maxLength={20}
            value={form.number}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-lg text-[#858584]">Message:</p>
          <textarea
            name="message"
            rows={5}
            className="text-white border-[0.5px] w-full py-1 px-4 rounded-md text-3xl bg-[#010B10] border-secondary"
            value={form.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button
          className="flex justify-center items-center m-auto w-[160px] rounded-xl text-2xl"
          text="Submit"
          variant="primary"
          onClick={handleClick}
        />
      </form>
    </div>
  );
}
