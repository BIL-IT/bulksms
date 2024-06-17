import { Injectable } from '@nestjs/common';

@Injectable()
export class KannelReportService {
  async getBearerBoxReport() {
    try {
      const resBearerBox = await fetch('http://172.16.16.108:13000/status');
      const bearerBoxText = await resBearerBox.text();
      const bearerBoxReport = !!bearerBoxText;

      return bearerBoxReport;
    } catch {
      return false;
    }
  }

  async getSMSBoxReport() {
    try {
      const resSMSBox = await fetch('http://172.16.16.108:13013/cgi-bin');
      const SMSBoxText = await resSMSBox.text();
      const SMSBoxReport = !!SMSBoxText;

      return SMSBoxReport;
    } catch {
      return false;
    }
  }
}
