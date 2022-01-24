import "babel-polyfill";
import { fetchGiphy, searchGiphy} from '../../../redux/giphy/giphy.reducer';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
    giphy: {
        giphyDetail: [],
        loading: false,
        error: false,
        errorMessage: "",
    }
});



describe('giphy actions', () => {

    it('dispatches fetch giphy after a successfull API requets', () => {
        mockedAxios.get.mockResolvedValue({ data: {} });
        const limit = '50';
        store.dispatch<any>(fetchGiphy(limit)).then(() => {
            let expectedActions = [
                { type: fetchGiphy.pending.type },
                {
                    type: fetchGiphy.fulfilled.type,
                }
            ]
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('dispatches fetch giphy after a error in API requets', () => {
        mockedAxios.get.mockRejectedValue('Network error: Something went wrong');
        const limit = '50';
        store.dispatch<any>(fetchGiphy(limit)).then(() => {
            let expectedActions = [
                { type: fetchGiphy.pending.type },
                {
                    type: fetchGiphy.rejected.type,
                }
            ]
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('dispatches search giphy after a error in API requets', () => {
        mockedAxios.get.mockRejectedValue('Network error: Something went wrong');
        const obj = {search: 'test', limit: '50'};
        store.dispatch<any>(searchGiphy(obj)).then(() => {
            let expectedActions = [
                { type: searchGiphy.pending.type },
                {
                    type: searchGiphy.rejected.type,
                }
            ]
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('dispatches search giphy after a successfull API requets', () => {
        mockedAxios.get.mockResolvedValue({ data: {} });
        const obj = {search: 'test', limit: '50'};
        store.dispatch<any>(searchGiphy(obj)).then(() => {
            let expectedActions = [
                { type: searchGiphy.pending.type },
                {
                    type: searchGiphy.fulfilled.type,
                }
            ]
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

});

