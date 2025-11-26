import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface ActivityRingProps {
  percentage: number;
  color: string;
  label: string;
  icon: React.ReactNode;
}

export const ActivityRing: React.FC<ActivityRingProps> = ({ percentage, color, label, icon }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 120;
    const height = 120;
    const radius = 50;
    const strokeWidth = 8;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Background circle
    g.append("circle")
      .attr("r", radius)
      .attr("fill", "none")
      .attr("stroke", "#e2e8f0")
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linecap", "round");

    // Foreground arc
    const arc = d3.arc()
      .innerRadius(radius - strokeWidth / 2)
      .outerRadius(radius + strokeWidth / 2)
      .startAngle(0)
      .cornerRadius(strokeWidth / 2);

    // Animate the arc
    const foreground = g.append("path")
      .datum({ endAngle: 0 })
      .attr("fill", color)
      .attr("d", arc as any);

    const targetAngle = (percentage / 100) * 2 * Math.PI;

    foreground.transition()
      .duration(1500)
      .attrTween("d", (d: any) => {
        const interpolate = d3.interpolate(d.endAngle, targetAngle);
        return (t: number) => {
          d.endAngle = interpolate(t);
          return arc(d) || "";
        };
      });

  }, [percentage, color]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="relative">
        <svg ref={svgRef} width={120} height={120} className="transform -rotate-90" />
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 rotate-90">
            {icon}
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className="text-xl font-bold text-slate-800">{percentage}%</div>
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{label}</div>
      </div>
    </div>
  );
};