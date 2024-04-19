import { useState } from 'react';
import emailJs from '@emailjs/browser';
import { Helmet } from 'react-helmet';
import { Icon } from '@iconify/react/dist/iconify.js';

import Button from '../../components/Button';

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
    <div className="flex px-4">
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
        <meta property="og:url" content="https://factory-ui.vercel.app/" />
        <meta property="twitter:title" content="Factory1155" />
        <meta
          property="twitter:description"
          content="This is Factory1155.com. Here you can get the unique 'Product Token' which is combined of 'blueprint token' and component tokens - ERC20, ERC721 and ERC1155 tokens"
        />
      </Helmet>
      <div className="hidden lg:flex lg:flex-col xl:flex xl:flex-col w-1/3 text-white px-4 py-16 gap-y-16">
        <div id="intro" className="flex flex-col gap-y-4">
          <h1 className="text-3xl font-bold">Get in touch</h1>
          <p className="text-xl opacity-55">
            We'd love to hear from you.
            <br /> Our friendly team is always here to chat.
          </p>
        </div>
        <div id="intro" className="flex flex-col gap-y-4">
          <h1 className="flex gap-4 items-center text-3xl font-bold">
            <Icon
              className="w-10 h-10 cursor-pointer justify-center items-center pt-2"
              icon="line-md:chat"
            />
            Chat to Us
          </h1>
          <p className="text-xl opacity-55">
            Our friendly team is here to help.
          </p>
        </div>
        <div id="intro" className="flex flex-col gap-y-4">
          <h1 className="flex gap-4 items-center text-3xl font-bold">
            <Icon
              className="w-10 h-10 cursor-pointer justify-center items-center pt-2"
              icon="basil:telegram-outline"
            />
            Live support
          </h1>
          <p className="text-xl opacity-55">
            Come join our Telegram community for live support! We're here to
            help you out.
          </p>
        </div>
        <div id="intro" className="flex flex-col gap-y-4">
          <h1 className="flex gap-4 items-center text-3xl font-bold">
            <Icon
              className="w-10 h-10 cursor-pointer justify-center items-center pt-2"
              icon="simple-icons:discord"
            />
            Share ideas
          </h1>
          <p className="text-xl opacity-55">
            Talk to our friendly team about what you want, and we'll make it a
            reality!
          </p>
        </div>
      </div>
      <div className="hidden lg:block xl:block w-0.5 bg-white m-8 opacity-50"></div>

      <div className="w-full min-w-80 lg:w-2/3 xl:w-2/3 py-12 px-4 sm:px-12 md:px-12 lg:px-12 xl:px-12">
        <p className="text-white font-semibold text-2xl sm:font-semibold sm:text-2xl md:font-bold md:text-4xl lg:font-black lg:text-5xl xl:font-black xl:text-6xl">
          Contact Us
        </p>
        <form className="flex flex-col gap-y-7 pt-8">
          <div className="flex flex-col gap-y-2">
            <p className="text-sm sm:text-sm md:text-base lg:text-lg xl:text-lg text-[#858584]">
              Name:
            </p>
            <input
              name="name"
              className="text-white border-[0.5px] w-full py-1 px-4 rounded-md text-base sm:text-xl md:text:2xl lg:text-3xl xl:text-3xl bg-[#010B10] border-secondary"
              maxLength={20}
              value={form.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="text-sm sm:text-sm md:text-base lg:text-lg xl:text-lg text-[#858584]">
              Email:
            </p>
            <input
              name="email"
              className="text-white border-[0.5px] w-full py-1 px-4 rounded-md text-base sm:text-xl md:text:2xl lg:text-3xl xl:text-3xl bg-[#010B10] border-secondary"
              maxLength={30}
              value={form.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="text-sm sm:text-sm md:text-base lg:text-lg xl:text-lg text-[#858584]">
              Phone Number:
            </p>
            <input
              name="number"
              className="text-white border-[0.5px] w-full py-1 px-4 rounded-md text-base sm:text-xl md:text:2xl lg:text-3xl xl:text-3xl bg-[#010B10] border-secondary"
              maxLength={20}
              value={form.number}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="text-sm sm:text-sm md:text-base lg:text-lg xl:text-lg text-[#858584]">
              Message:
            </p>
            <textarea
              name="message"
              rows={5}
              className="text-white border-[0.5px] w-full py-1 px-4 rounded-md text-base sm:text-xl md:text:2xl lg:text-3xl xl:text-3xl bg-[#010B10] border-secondary"
              value={form.message}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button
            className="flex justify-center items-center m-auto w-[160px] rounded-xl text-base sm:text-base md:text-xl lg:text-2xl xl:text-2xl"
            text="Submit"
            variant="primary"
            onClick={handleClick}
          />
        </form>
      </div>
    </div>
  );
}
