import Accordion from './Accordion';

export default function FAQ() {
  return (
    <div className="relative z-20 px-4 py-8 rounded-t-[65px] bg-[#000000] sm:px-10 md:px-15 md:py-8 lg:px-20">
      <h1 className="px-2 pt-16 text-white text-[22px] md:text-[30px] lg:text-3xl font-medium pb-9">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-col">
        <Accordion
          title="1. What is Blueprint?"
          content={
            <p className="leading-8 px-1">
              Blueprint is <span className="text-white">ERC1155</span> Token
              that includes information about Product Token, and that allows
              project owners to create NFTs containing specific combinations of
              kinds of&nbsp;
              <span className="text-white">Tokens</span>.
            </p>
          }
        />
        <Accordion
          title="2. What is Product?"
          content={
            <p className="leading-8 px-1">
              Product is the main asset of platform synthesized by users using
              Blueprint NFTs and the corresponding <span>Component Tokens</span>
              .
            </p>
          }
        />
        <Accordion
          title="3. How to get origin tokens from Product?"
          content={
            <p className="leading-8 px-1">
              Origin tokens back to users by decomposing Product.
            </p>
          }
        />
        <Accordion
          title="4. What is Factory Platform?"
          content={
            <p className="leading-8 px-1">
              Factory is an innovative NFT platform based on blockchain
              technology, dedicated to offering users a unique experience in NFT
              synthesis and management. The platform enables users to create
              new, higher-level NFTs, referred to as &quot;Product Tokens&quot;,
              by staking existing digital asset -{' '}
              <span className="text-white">ERC-20</span>,&nbsp;
              <span className="text-white">ERC-721</span>,&nbsp;and{' '}
              <span className="text-white">ERC-1155</span>.
            </p>
          }
        />
        <Accordion
          title="5. How to buy Product?"
          content={
            <p className="leading-8 px-1">
              Users can get Product by minting own Blueprins that minted from
              Blueprint. Also users can decompose Product to Blueprint directly.
            </p>
          }
        />
      </div>
    </div>
  );
}
