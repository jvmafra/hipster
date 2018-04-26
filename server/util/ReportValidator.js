import * as erro from '../util/ErroHandler';

export class ReportValidator {

  static async isValid(report) {
    let isValid = false;
    var message = '';
    
    if (report.ownerUsername === undefined || report.ownerUsername.trim() === ""){
      message += erro.REPORT.VALIDACAO_OWNER + ';';
    }

    if (report.reportedUser === undefined || report.reportedUser.trim() === ""){
      message += erro.REPORT.VALIDACAO_REPORTED_USER + ';';
    }

    if (report.description === undefined || report.description.trim() === ""){
      message += erro.REPORT.VALIDACAO_DESCRIPTION + ';';
    }

    if (report.ownerUsername === report.reportedUser){
      message += erro.REPORT.VALIDACAO_REPORT_YOURSELF + ';';
    }

    if (message == ''){
      isValid = true;
      message = "ok";
    } else {
      isValid = false;
    }

    return {'return': isValid, 'message': message};
  }

}