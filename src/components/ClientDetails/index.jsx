import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import setaOrdem from "../../assets/Frame.svg";
import plus from "../../assets/add.svg";
import clientIcon from "../../assets/cliente_menu.svg";
import edit from "../../assets/editar.svg";
import deleteIcon from "../../assets/icon_delete.svg";
import editIcon from "../../assets/icone_edit.svg";
import { MyContext } from '../../contexts/MyContext';
import "../../index.css";
import api from '../../services/api';
import "./style.css";


const ClientDetails = () => {
  const navigate = useNavigate();

  const { setSelected, selectedClient } = useContext(MyContext);

  const [status, setStatus] = useState(true);
  const [dbClient, setDbClient] = useState([]);
  const [dbDebts, setDbDebts] = useState([]);

  useEffect(() => {
    console.log("aqui");
    console.log(selectedClient);
  }, [selectedClient])


  useEffect(() => { getCharges(); getClient() }, [])

  async function getClient() {

    const token = localStorage.getItem('token');


    try {
      const response = await api.get(
        `/detailClient/${selectedClient}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setDbClient(response.data.client[0])

      console.log(response.data.client[0]);

    } catch (error) {

    }
  }

  async function getCharges() {

    const token = localStorage.getItem('token');

    try {
      const response = await api.get(
        `/debtsClient/${selectedClient}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setDbDebts(response.data.debts)

    } catch (error) {

    }
  }

  const { updateClient, setUpdateClient } = useContext(MyContext);

  return (
    <div className="container-client-detail">

      <div className="title-client-detail">
        <img src={clientIcon} alt="Client Icon" />
        <h1>
          Sara Lage Silva
        </h1>
      </div>

      <div className="client-detail-body">

        <div className="container-data-client">
          <div className="title-data-client-box">
            <h2>Dados do cliente</h2>
            <button>
              <img
                src={editIcon}
                alt=""
              />
              Editar Cliente
            </button>
          </div>

          <div className="box-data">
            <div className="box-data-row">
              <div className="collum-email">
                <h3 className="box-data-title">E-mail</h3>
                <h4 className="box-data-content">sarasilva@gmail.com</h4>
              </div>
              <div className="collum-phone">
                <h3 className="box-data-title">Telefone</h3>
                <h4 className="box-data-content">71 9 9462 8654</h4>
              </div>
              <div className="collum-cpf">
                <h3 className="box-data-title">CPF</h3>
                <h4 className="box-data-content">054 365 255 87</h4>
              </div>
            </div>

            <div className="box-data-row">
              <div className="collum-email">
                <h3 className="box-data-title">Endereço</h3>
                <h4 className="box-data-content">Rua das Cornélias; nº 512</h4>
              </div>
              <div className="collum-phone">
                <h3 className="box-data-title">Bairro</h3>
                <h4 className="box-data-content">Oliveiras</h4>
              </div>
              <div className="collum-cpf">
                <h3 className="box-data-title">Complemento</h3>
                <h4 className="box-data-content">Ap: 502</h4>
              </div>
              <div className="box-cep">
                <h3 className="box-data-title">CEP</h3>
                <h4 className="box-data-content">031 654 524 04</h4>
              </div>
              <div className="box-city">
                <h3 className="box-data-title">Cidade</h3>
                <h4 className="box-data-content">Salvador</h4>
              </div>
              <div className="box-state">
                <h3 className="box-data-title">UF</h3>
                <h4 className="box-data-content">BA</h4>
              </div>
            </div>
          </div>

        </div>


        <div className="container-changes-client">

          <div className="title-data-change-box">
            <h2>Cobrança do Cliente</h2>
            <button className="change-box-btn">
              <img src={plus} alt="" />
              Nova cobrança
            </button>
          </div>

          <table className="client-changes-table">
            <thead className="client-changes-table-header">
              <tr >
                <th className="collum-idcob"><img src={setaOrdem} alt="" />ID Cob.</th>
                <th className="collum-date"><img src={setaOrdem} alt="" />Data de venc.</th>
                <th className="collum-value">Valor</th>
                <th className="collum-status">Status</th>
                <th className="collum-description">Descrição</th>
                <th className="collum-void">{" "}</th>
              </tr>
            </thead>
            <tbody className="table-charges-row">

              <tr >
                <td >248563147</td>
                <td >26/01/2021</td>
                <td >R$ 500,00</td>
                {e.status === "Vencida" && <td className="row-collum-status"><div className="status-won" >Vencida</div></td>}
                {e.status === "Vencida" && <td className="row-collum-status"><div className="status-won" >Pendente}</div></td>}
                {e.status === "Vencida" && <td className="row-collum-status"><div className="status-won" >Paga</div></td>}
                <td className="row-collum-description">lorem ipsum lorem ipsum lorem lorem ips,,,</td>
                <td className="row-icons">
                  <div>
                    <img src={edit} alt="" />
                    <img src={deleteIcon} alt="" />
                  </div>
                </td>
              </tr>

            </tbody>
          </table>

        </div>

      </div>

    </div>

  );
}

export default ClientDetails;