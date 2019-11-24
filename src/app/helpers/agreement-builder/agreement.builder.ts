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
    redemptionPriceVat: string
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
      redemptionPriceVat: redemptionPriceVat
    });

    return "\uFEFF"+html;
  }
}