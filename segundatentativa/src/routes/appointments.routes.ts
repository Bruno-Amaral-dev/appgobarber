import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.get('/', async (request, response) => {
    console.log(request.user);
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
     response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {

        const { provider_id, date } = request.body;

        
        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id
        })


         response.json(appointment);

    }
);

export default appointmentsRouter;