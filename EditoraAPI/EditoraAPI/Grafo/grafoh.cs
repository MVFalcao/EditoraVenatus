using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grafo
{
    public class Grafoh
    {
        private SortedDictionary<int, Vertice> vertices = new SortedDictionary<int, Vertice>();
        private bool _direcionado = false;

        public Grafoh(bool direcionado) {
            _direcionado = direcionado;
        }

        public void inserir_vertice(int id) {
            Vertice v = new Vertice(id);
            vertices[id] = v;
        }

        public void inserir_aresta(int de, int para, int peso) {
            Vertice p = vertices[para];
            Vertice d = vertices[de];
            vertices[de].inserir_vertice_adjacente(p, peso);
            if (!_direcionado) {                                   
                vertices[para].inserir_vertice_adjacente(d, peso);
            } 
        }

        public Vertice get_vertice(int vertice){
            if (vertices.ContainsKey(vertice))
            {
                return vertices[vertice];
            }
            else {
                return null;
            }
        }
        public SortedDictionary<int, Vertice> get_vertices() {
            return vertices;
        }

        public void set_vertices(SortedDictionary<int, Vertice> vs)
        {
            vertices = vs;
        }    
    }

}
