/* eslint-disable camelcase */
import BankingBillet from './BankingBillet';
import CreditCard from './CreditCard';

export default function PaymentTab({ payment = {}, subscription = {} }) {
  if (payment?.status === 'waiting' || subscription?.status === 'waiting') {
    const { banking_billet } = payment?.payment;
    return (
      <div className="text-center m-5">
        <h4 className="text-primary m-0 mb-4">Aguardando pagamento</h4>
        {banking_billet && (
          <>
            <a
              href={banking_billet?.link}
              target="__blank"
              className="mx-2 btn btn-outline-secondary"
              aria-hidden="true"
            >
              Visualizar boleto
            </a>
            <a
              href={banking_billet?.pdf?.charge}
              target="__blank"
              download={`banking_billet_${payment?.charge_id ?? subscription?.subscription_id}`}
              className="mx-2 btn btn-secondary"
              aria-hidden="true"
            >
              Baixar boleto
            </a>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            id="banking-billet-tab"
            className="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#banking-billet"
            type="button"
            role="tab"
            aria-controls="banking-billet"
            aria-selected="true"
          >
            Boleto
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            id="credit-card-tab"
            className="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#credit-card"
            type="button"
            role="tab"
            aria-controls="credit-card"
            aria-selected="false"
          >
            Cartão
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="banking-billet" role="tabpanel" aria-labelledby="banking-billet-tab">
          <BankingBillet payment={payment} subscription={subscription} />
        </div>
        <div className="tab-pane fade" id="credit-card" role="tabpanel" aria-labelledby="credit-card-tab">
          <CreditCard payment={payment} subscription={subscription} />
        </div>
      </div>
    </>
  );
}
