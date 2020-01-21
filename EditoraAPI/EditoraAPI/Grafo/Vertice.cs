using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace Grafo
{
    public class Vertice
    {
        private int _id;
        private Dictionary<Vertice, int> adjacencias = new Dictionary<Vertice, int>();
        private int _distancia = 0;
        private bool _visitado = false;
        private Vertice _vertice_anterior = null;

        public Vertice(int id) {
           _id = id;
        }

        public int get_id() {
            return _id;
        }

        public void inserir_vertice_adjacente(Vertice para, int peso) {
            adjacencias[para] = peso;
        }

        public Dictionary<Vertice, int> get_adjacentes() {
            var dicaux = adjacencias.OrderBy(x => x.Value).ToDictionary(x => x.Key, x => x.Value);
            return dicaux;            
        }

        public void set_distancia(int distancia){
            _distancia = distancia;
        }

        public int get_distancia() {
            return _distancia;
        }

        public int get_peso(Vertice v) {
            return adjacencias[v];
        }

        public void set_visitado(bool visitado){
            _visitado = visitado;
        }
        public bool get_visitado() {
            return _visitado;
        }

        public void set_vertice_caminho_anterior(Vertice v){
            _vertice_anterior = v;
        }            

        public Vertice get_vertice_caminho_anterior(){
            return _vertice_anterior;
        }
    }
            
}
