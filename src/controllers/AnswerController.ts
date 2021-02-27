import { Request, Response } from 'express';
import { getCustomRepository } from "typeorm";
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


class AnswerController {

    // http://localhost:3333/answers/5?u=62a858a0-b4b0-4c72-8a52-2dc20f7a9216
    /**
     * Route Params => Parametros que compõem a rota
        routes.get("/answers/:value")

     * Query Params => Busca, Paginação, não obrigatórios
        ?chave=valor
    */

    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;
        
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),
        });

        if(!surveyUser) {
            throw new AppError("Survey User does not exists!");

        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.status(200).json(surveyUser);
    }
}

export { AnswerController };