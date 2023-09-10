using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace triangulation
{
    public class Triangle
    {
		public static List<List<Vector3>> Triangulate(int H = 3, int R = 3, int N = 3)
		{
			Vector3 A = new Vector3(0, H, 0);
			Vector3 B = new Vector3(0, -(R * R) / H, 0);
			Vector3 NullPoint = Vector3.Zero;

			List<Vector3> vertices = new List<Vector3>();
			List<Vector3> normals = new List<Vector3>();

			for (int i = 0; i < N; i++)
			{
				Vector3 p1 = GetPi(i, R, N);
				Vector3 p2 = GetPi(i + 1, R, N);

				vertices.Add(p1);
				vertices.Add(A);
				vertices.Add(p2);

				vertices.Add(p1);
				vertices.Add(NullPoint);
				vertices.Add(p2);


				normals.Add(GetNi(p1, B, true));
				normals.Add(GetNi(A, B, true));
				normals.Add(GetNi(p2, B, true));

				normals.Add(GetNi(p1, B, false));
				normals.Add(GetNi(NullPoint, B, false));
				normals.Add(GetNi(p2, B, false));
			}

			List<List<Vector3>> result = new List<List<Vector3>>();
			result.Add(vertices);
			result.Add(normals);

			return result;
		}

		private static Vector3 GetPi(int i, int R, int N)
		{
			return new Vector3(
				(float)(R * Math.Cos(2f * Math.PI * i / N)),
				0f,
				(float)(R * Math.Sin(2f * Math.PI * i / N))
			);
		}

		private static Vector3 GetNi(Vector3 Pi, Vector3 B, bool frontSide = true)
		{
			Vector3 Ni = new Vector3();
			if (frontSide)
			{
				Ni = new Vector3(
					Pi.X - B.X,
					Pi.Y - B.Y,
					Pi.Z - B.Z
				);
			}
			else
			{
				Ni = new Vector3(
					B.X - Pi.X,
					B.Y - Pi.Y,
					B.Z - Pi.Z
				);
			}

			double NiMagnitude = Math.Sqrt(
				Math.Pow(Ni.X, 2) +
				Math.Pow(Ni.Y, 2) +
				Math.Pow(Ni.Z, 2)
			);

			Ni = new Vector3(
				(float)(Ni.X / NiMagnitude),
				(float)(Ni.Y / NiMagnitude),
				(float)(Ni.Z / NiMagnitude)
			);

			return Ni;
		}
	}
}
