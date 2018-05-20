import db_config from '../config/db_config';
import Report from '../model/Report'

db_config();

/**
 * Service responsavel pela lógica de reports
 *
 * @author Team Hipster
 */
export class ReportService{
  
    /**
     * Cadastra um Report
     *
     * @param   {Object}  report contendo os campos preenchidos
     * @return  {Promise} Promise resolvida com o objeto Report
     * da forma que o mongo retorna
     */
    static registerReport(report) {
      const reportMongoose = new Report(report);
      return reportMongoose.save();
    }
      
}