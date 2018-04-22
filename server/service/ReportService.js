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
     * Consulta um Report dado um id.
     *
     * @param   {String}  id do report para recuperação.
     * @returns {Promise}  Promise resolvida com o objeto Report
     * da forma que o mongo retorna.
     */
    static retrieveReport(id) {
      return Report.findOne({_id: id}).exec();
    }
  
     /**
     * Consulta todos os Reports.
     *
     * @returns {Promise}  Promise resolvida com uma lista de objetos Report
     * da forma que o mongo retorna.
     */
    static retrieveReports() {
      return Report.find({}).sort({reportDate: -1}).exec();
    }
        
    /**
     * Remove um Report
     *
     * @param   {String}  id referente ao report a ser removido
     * @return  {Promise} Promise resolvida
     */
    static removeReport(id) {
      return new Promise((resolve, reject) =>
        Report.findOneAndRemove({_id: id}, (err, result) => {
          if (err || !result) return reject(err);
          return resolve(result);
        })
      );
    }
  
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
  
    /**
     * Remove todas os Reports
     *
     * @return  {Promise} Promise resolvida com o resultado da
     * remoção de todas as Reports.
     */
    static removeReports() {
      return new Promise((resolve, reject) =>
        Report.remove({}, (err, result) => {
          if (err || !result) return reject(err);
          return resolve(result);
        })
      );
    }
      
  }