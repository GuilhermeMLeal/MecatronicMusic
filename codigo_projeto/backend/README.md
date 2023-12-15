
# Aplicação Django para MusicAPI

Esta aplicação Django é um exemplo de integração com a MusicAPI, uma API que gerencia informações de um sensor de presença e o tempo estudado. Ela está em conjunto com a turma de Mecatrônica e é representada pela matéria de IoT.

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/GuilhermeMLeal/MecatronicMusic.git
    cd codigo_projeto
    cd back-end
    ```

2. Crie um ambiente virtual e ative-o:

    ```bash
    python -m venv myenv
    source myenv/bin/activate  # Linux/macOS
    # Ou
    myenv\Scripts\activate  # Windows
    ```

3. Instale as dependências:

    ```bash
    pip install -r requirements.txt
    ```

4. Execute as migrações do Django:

    ```bash
    python manage.py migrate
    ```

5. Inicie o servidor:

    ```bash
    python manage.py runserver
    ```

O servidor estará disponível em `http://127.0.0.1:8000/`.

## Uso da API

### Endpoints da MusicAPI

#### Sensor de Presença 

- **GET EspInfo:** `GET http://127.0.0.1:8000/espinfo/`
  - Retorna os dados registradas pelo sensor (tempo, data e ultima atualização).

- **POST EspInfo:** `POST http://127.0.0.1:8000/espinfo/`
  - Envia um novo dado registrado pelo sensor.
  - Exemplo de payload:
    ```json
    {
        "tempo_de_estudo": 12.00
    }
    ```

- **GET Temperatura específica:** `GET http://127.0.0.1:8000/espinfo/1/`
  - Retorna detalhes de um registro específico com ID 1.

