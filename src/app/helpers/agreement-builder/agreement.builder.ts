import * as Handlebars from 'handlebars'
import * as template from '../../templates/basic-agreement-template.html';

export class AgreementBuilder {
  public static buildAgreement(
    legalEntityName: string,
    individualName: string,
    date: string,
    deliveryDate: string,
    termInMonths: string,
    monthlyLeasePayment: string,
    monthlyVat: string,
    totalLeasePayment: string,
    totalVat: string,
    redemptionPrice: string,
    redemptionPriceVat: string,
    ogrn: string,
    inn: string,
    kpp: string,
    bik: string,
    okpo: string,
    paymentAccount: string,
    bank: string,
    address: string,
    correspondentAccount: string,
    product: string
  ): string {

    const html = Handlebars.compile(template)({
      legalEntityName: legalEntityName,
      individualName: individualName,
      date: date,
      deliveryDate: deliveryDate,
      termInMonths: termInMonths,
      monthlyLeasePayment: monthlyLeasePayment,
      monthlyVat: monthlyVat,
      totalLeasePayment: totalLeasePayment,
      totalVat: totalVat,
      redemptionPrice: redemptionPrice,
      redemptionPriceVat: redemptionPriceVat,
      ogrn: ogrn,
      inn: inn,
      kpp: kpp,
      bik: bik,
      okpo: okpo,
      paymentAccount: paymentAccount,
      bank: bank,
      address: address,
      correspondentAccount: correspondentAccount,
      product: product
    });

    return "\uFEFF" + html;
  }
}